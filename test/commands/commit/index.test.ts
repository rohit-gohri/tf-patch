import {runCommand} from '@oclif/test'
import {expect} from 'chai'
import * as fse from 'fs-extra'
import {mkdtempSync} from 'node:fs'
import {readFile, writeFile} from 'node:fs/promises'
import {tmpdir} from 'node:os'
import path from 'node:path'

import {PATCHES_DIR} from '../../../src/commands/commit/index.js'
import {PATCH_DATA_FILE, TERRAFORM_MODULES_DIR} from '../../../src/commands/patch/index.js'

describe('commit', () => {
  let tmpDir: string
  let originalCwd: string

  before(() => {
    originalCwd = process.cwd()
    tmpDir = mkdtempSync(path.join(tmpdir(), 'tf-patch-commit-test-'))
  })

  after(async () => {
    process.chdir(originalCwd)
    await fse.remove(tmpDir)
  })

  it('throws an error when folder is not found', async () => {
    const {error} = await runCommand('commit /nonexistent-folder-xyz-abc')
    expect(error?.message).to.contain('not found')
  })

  it('creates a patch file from a modified module', async () => {
    process.chdir(tmpDir)

    const module = 'test-module'
    const moduleDir = path.join(tmpDir, TERRAFORM_MODULES_DIR, module)
    await fse.ensureDir(moduleDir)
    await writeFile(path.join(moduleDir, 'main.tf'), 'resource "null_resource" "original" {}\n')

    // Create the patched folder that commit expects
    const patchedDir = mkdtempSync(path.join(tmpdir(), 'tf-patch-patched-'))
    const moduleFolder = path.join(patchedDir, 'module')
    await fse.ensureDir(moduleFolder)
    await writeFile(path.join(moduleFolder, 'main.tf'), 'resource "null_resource" "modified" {}\n')
    await writeFile(
      path.join(patchedDir, PATCH_DATA_FILE),
      JSON.stringify({module}),
    )

    try {
      const {stdout} = await runCommand(`commit ${moduleFolder}`)
      expect(stdout).to.contain('Created patch file')
      const patchFile = path.join(tmpDir, PATCHES_DIR, `${module}.patch`)
      expect(await fse.pathExists(patchFile)).to.equal(true)
      const patchContent = await readFile(patchFile, 'utf8')
      expect(patchContent).to.contain('original')
      expect(patchContent).to.contain('modified')
    } finally {
      await fse.remove(patchedDir)
    }
  })
})
