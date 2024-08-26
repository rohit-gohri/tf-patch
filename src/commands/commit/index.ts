import {Args, Command} from '@oclif/core'
import * as fse from 'fs-extra'
import * as _ from 'lodash-es'
import {spawn} from 'node:child_process'
import {readFile, writeFile} from 'node:fs/promises'
import path from 'node:path'
import {clearTimeout, setTimeout} from 'node:timers'
import {dir} from 'tmp'

import {PATCH_DATA_FILE, TERRAFORM_MODULES_DIR} from '../patch/index.js'

export const PATCHES_DIR = `.patches`

export const normalizePath = (p: string) => (p.startsWith(`/`) ? p.slice(1) : p)

export default class Commit extends Command {
  static args = {
    folder: Args.string({description: 'Folder with changed files', required: true}),
  }

  static description = `This command will cause a package to be extracted in a temporary directory
intended to be editable at will.`

  static examples = [`<%= config.bin %> <%= command.id %> gke-cluster`]

  static flags = {}

  async run(): Promise<void> {
    const {args} = await this.parse(Commit)
    const {folder: dirB} = args

    if (!(await fse.exists(dirB))) {
      throw new Error(`Folder "${dirB}" not found`)
    }

    const tmpDir = path.join(dirB, '..')
    const metadata = JSON.parse((await readFile(path.join(tmpDir, PATCH_DATA_FILE))).toString('utf8'))
    const {module} = metadata
    const moduleDir = path.resolve(`${TERRAFORM_MODULES_DIR}/${module}`)

    if (!(await fse.exists(moduleDir))) {
      throw new Error(`Folder "${moduleDir}" not found`)
    }

    this.log(`[tf-patch] Found module "${module}"`)

    dir({keep: false, unsafeCleanup: true}, async (err, dirA, cleanup) => {
      if (err) {
        throw err
      }

      await fse.copy(moduleDir, dirA)
      await fse.remove(path.join(dirA, '.git'))

      this.log(`[tf-patch] Diffing source module and patch dir: \nA: ${dirA}\nB: ${dirB}`)
      // Using yarn as reference - https://github.com/yarnpkg/berry/blob/7fab4f101d1b8a98691efe14696d18ce00ecd234/packages/plugin-patch/sources/patchUtils.ts#L281-L298
      const gitDiff = await spawn(
        `git`,
        [
          `-c`,
          `core.safecrlf=false`,
          `diff`,
          `--src-prefix=a/`,
          `--dst-prefix=b/`,
          `--ignore-cr-at-eol`,
          `--full-index`,
          `--no-index`,
          `--no-renames`,
          `--text`,
          dirA,
          dirB,
        ],
        {
          env: {
            ...process.env,
            // #region Predictable output
            // These variables aim to ignore the global git config so we get predictable output
            // https://git-scm.com/docs/git#Documentation/git.txt-codeGITCONFIGNOSYSTEMcode
            GIT_CONFIG_NOSYSTEM: `1`,
            HOME: ``,
            USERPROFILE: ``,
            XDG_CONFIG_HOME: ``,
            // #endregion
          },
        },
      )
      const stderr = (await gitDiff.stderr.toArray()).join('\n')
      // we cannot rely on exit code, because --no-index implies --exit-code
      // i.e. git diff will exit with 1 if there were differences
      if (stderr.length > 0) {
        throw new Error(
          `Unable to diff directories. Make sure you have a recent version of 'git' available in PATH.\nThe following error was reported by 'git':\n${stderr}`,
        )
      }

      const controller = new AbortController()
      const timer = setTimeout(() => {
        this.log('[tf-patch] Timed out creating patch')
        controller.abort()
      }, 10_000)
      const stdoutArr = await gitDiff.stdout.toArray({signal: controller.signal})
      clearTimeout(timer)

      const stdout = stdoutArr
        .join('\n')
        .replace(new RegExp(`(a|b)(${_.escapeRegExp(`/${normalizePath(dirA)}/`)})`, `g`), `$1/`)
        .replace(new RegExp(`(a|b)${_.escapeRegExp(`/${normalizePath(dirB)}/`)}`, `g`), `$1/`)
        .replace(new RegExp(_.escapeRegExp(`${dirA}/`), `g`), ``)
        .replace(new RegExp(_.escapeRegExp(`${dirB}/`), `g`), ``)

      if (!stdout.trim()) {
        throw new Error(`No changed detected in module "${module}"`)
      }

      await fse.ensureDir(PATCHES_DIR)
      const patchFile = path.join(PATCHES_DIR, `${module}.patch`)
      await writeFile(patchFile, stdout)
      this.log(`[tf-patch] Created patch file: ${patchFile}`)

      cleanup()
    })
  }
}
