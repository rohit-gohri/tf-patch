import {Command} from '@oclif/core'
import * as fse from 'fs-extra'
import {globby} from 'globby'
import {readFile, writeFile} from 'node:fs/promises'
import path from 'node:path'
import parse, {File} from 'parse-diff'

import {PATCHES_DIR} from '../commit/index.js'
import {TERRAFORM_MODULES_DIR} from '../patch/index.js'

async function isAlreadyModified(_from: string, _file: File): Promise<boolean> {
  // TODO: TBD
 return false
}

async function applyModification(from: string, file: File) {
  const fileContents = await readFile(from, `utf8`)
  const originalFileLines = fileContents.split(/\n/)
  let fileLines = [...originalFileLines]
  let linesAdded = 0

  for (const chunk of file.chunks) {
    for (const change of chunk.changes) {
      const content = change.content.slice(1)
      // ln index starts from 1 rather than 0
      const ln = ('ln' in change ? change.ln + linesAdded : change.ln2) - 1
      const og = originalFileLines[('ln1' in change ? change.ln1 : change.ln) - 1]
      const update = fileLines[ln]

      switch (change.type) {
        case 'normal': {
          if (og !== content || og !== update) {
            throw new Error(
              'Patch is no longer valid as original file has changed (possibly due to module upgrade). Please recreate patch by following the steps again',
            )
          }

          break
        }

        case 'add': {
          fileLines = [
            // Add change has new line number so we don't need to add/subtract linesAdded from it
            ...fileLines.slice(0, change.ln - 1),
            content,
            ...fileLines.slice(change.ln - 1),
          ]
          linesAdded += 1
          break
        }

        case 'del': {
          if (content !== update) {
            throw new Error(
              'Patch is no longer valid as original file has changed (possibly due to module upgrade). Please recreate patch by following the steps again',
            )
          }

          fileLines = [...fileLines.slice(0, ln), ...fileLines.slice(ln + 1)]
          linesAdded -= 1
          break
        }

        default: {
          throw new Error('Invalid diff')
        }
      }
    }
  }

  await writeFile(from, fileLines.join('\n'))
}

export default class Init extends Command {
  static args = {}

  static description = `This command will apply any patches found in the .patches directory to the corresponding terraform modules`

  static examples = [`<%= config.bin %> <%= command.id %>`]

  static flags = {}

  async run(): Promise<void> {
    const patches = await globby(`${PATCHES_DIR}/*.patch`, {
      onlyFiles: true,
    })
    await Promise.all(
      patches.map(async (patchFile) => {
        const module = path.basename(patchFile, '.patch')
        const moduleDir = path.join(TERRAFORM_MODULES_DIR, module)
        if (!(await fse.exists(moduleDir))) {
          throw new Error(`Patch found for module "${module}", which does not exist. Did you do terraform init?`)
        }

        this.log(`[tf-patch] Found patch for module "${module}"`)
        const patch = await readFile(patchFile, {encoding: 'utf8'})
        const diff = parse(patch)

        for await (const file of diff) {
          const from = file.from ? path.join(moduleDir, file.from) : undefined
          const to = file.to ? path.join(moduleDir, file.to) : undefined
          const filePath: string = file.new ? to! : from!;

          this.log(`[tf-patch] Parsed diff for file "${filePath}" in module "${module}"`)

          switch (true) {
            case file.deleted: {
              if (!(await fse.exists(filePath))) {
                this.log(`[tf-patch] File already deleted "${filePath}" in module "${module}"`)
                break
              }

              await fse.remove(filePath)
              break
            }

            case file.new: {
              const contents = file.chunks.map((ch) => ch.content).join('\n');
              if (await fse.exists(filePath)) {
                const existing = await readFile(filePath, {encoding: 'utf8'})
                if (existing === contents) {
                  this.log(`[tf-patch] File already created "${filePath}" in module "${module}"`)
                  break
                }
                else {
                  throw new Error(`[tf-patch] Patch has conflicts with module for file "${filePath}"`)
                }
              }

              await writeFile(filePath, contents, {mode: file.newMode})
              break
            }

            default: {
              if ((await isAlreadyModified(filePath, file))) {
                this.log(`[tf-patch] File already updated "${filePath}" in module "${module}"`)
                break
              }

              await applyModification(filePath, file)
            }
          }
        }

        this.log(`[tf-patch] Updated module, "${module}", with patch file: ${patchFile}`)
      }),
    )
  }
}
