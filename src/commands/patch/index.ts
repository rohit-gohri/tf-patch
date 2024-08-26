import {Args, Command} from '@oclif/core'
import * as fse from 'fs-extra'
import {writeFile} from 'node:fs/promises'
import path from 'node:path'
import {dir} from 'tmp'

if (process.env.TEST_CWD) {
  process.chdir(process.env.TEST_CWD)
}

export const PATCH_DATA_FILE = `.patch.json`
export const TERRAFORM_MODULES_DIR = `.terraform/modules`

export default class Patch extends Command {
  static args = {
    module: Args.string({description: 'Module to patch', required: true}),
  }

  static description = `This command will cause a package to be extracted in a temporary directory
intended to be editable at will.`

  static examples = [`<%= config.bin %> <%= command.id %> gke-cluster`]

  static flags = {}

  async run(): Promise<void> {
    this.log(`[tf-patch] CWD: ${process.cwd()}`)

    const {args} = await this.parse(Patch)
    const {module} = args
    const moduleDir = path.join(TERRAFORM_MODULES_DIR, module)

    if (!(await fse.exists(moduleDir))) {
      throw new Error(`Module "${module}" not found in terraform modules directory`)
    }

    dir(async (err, tmpDir) => {
      if (err) {
        throw err
      }

      await writeFile(
        path.join(tmpDir, PATCH_DATA_FILE),
        JSON.stringify({
          module,
        }),
      )

      const tmpModule = path.join(tmpDir, 'module')
      await fse.ensureDir(tmpModule)
      await fse.copy(moduleDir, tmpModule)
      await fse.remove(path.join(tmpModule, '.git'))

      this.log(`[tf-patch] You can now edit the following folder: ${tmpModule}`)
      this.log(
        `[tf-patch] Once you are done run "tf-patch commit ${tmpModule}" and we will store a patchfile based on your changes.`,
      )
    })
  }
}
