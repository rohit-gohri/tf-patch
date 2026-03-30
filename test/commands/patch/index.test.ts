import {runCommand} from '@oclif/test'
import {expect} from 'chai'
import * as fse from 'fs-extra'
import {mkdtempSync} from 'node:fs'
import {writeFile} from 'node:fs/promises'
import {tmpdir} from 'node:os'
import path from 'node:path'

import {TERRAFORM_MODULES_DIR} from '../../../src/commands/patch/index.js'

describe('patch', () => {
  let tmpDir: string
  let originalCwd: string

  before(() => {
    originalCwd = process.cwd()
    tmpDir = mkdtempSync(path.join(tmpdir(), 'tf-patch-test-'))
  })

  after(async () => {
    process.chdir(originalCwd)
    await fse.remove(tmpDir)
  })

  it('throws an error when module is not found', async () => {
    process.chdir(tmpDir)
    const {error} = await runCommand('patch nonexistent-module-xyz')
    expect(error?.message).to.contain('not found in terraform modules directory')
  })

  it('creates a tmp module folder and patch data file for a valid module', async () => {
    process.chdir(tmpDir)
    const moduleDir = path.join(tmpDir, TERRAFORM_MODULES_DIR, 'my-module')
    await fse.ensureDir(moduleDir)
    await writeFile(path.join(moduleDir, 'main.tf'), 'resource "null_resource" "example" {}')

    const {stdout} = await runCommand('patch my-module')
    expect(stdout).to.contain('You can now edit the following folder')
    expect(stdout).to.contain('tf-patch commit')
  })
})
