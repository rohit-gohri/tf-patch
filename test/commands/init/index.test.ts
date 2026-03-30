import {runCommand} from '@oclif/test'
import {expect} from 'chai'
import * as fse from 'fs-extra'
import {mkdtempSync} from 'node:fs'
import {readFile, writeFile} from 'node:fs/promises'
import {tmpdir} from 'node:os'
import path from 'node:path'

import {PATCHES_DIR} from '../../../src/commands/commit/index.js'
import {TERRAFORM_MODULES_DIR} from '../../../src/commands/patch/index.js'

const SAMPLE_PATCH = `diff --git a/main.tf b/main.tf
index abc1234..def5678 100644
--- a/main.tf
+++ b/main.tf
@@ -1,3 +1,3 @@
 resource "null_resource" "example" {
-  triggers = {}
+  triggers = { always_run = true }
 }
`

describe('init', () => {
  let tmpDir: string
  let originalCwd: string

  before(() => {
    originalCwd = process.cwd()
  })

  beforeEach(() => {
    tmpDir = mkdtempSync(path.join(tmpdir(), 'tf-patch-init-test-'))
    process.chdir(tmpDir)
  })

  afterEach(async () => {
    process.chdir(originalCwd)
    await fse.remove(tmpDir)
  })

  it('throws an error when no patches are found', async () => {
    const {error} = await runCommand('init')
    expect(error?.message).to.contain('No terraform module patches found')
  })

  it('throws an error when module does not exist', async () => {
    await fse.ensureDir(path.join(tmpDir, PATCHES_DIR))
    await writeFile(path.join(tmpDir, PATCHES_DIR, 'missing-module.patch'), SAMPLE_PATCH)

    const {error} = await runCommand('init')
    expect(error?.message).to.contain('missing-module')
    expect(error?.message).to.contain('does not exist')
  })

  it('applies a patch to a terraform module', async () => {
    const module = 'apply-test-module'
    const moduleDir = path.join(tmpDir, TERRAFORM_MODULES_DIR, module)
    await fse.ensureDir(moduleDir)
    await writeFile(
      path.join(moduleDir, 'main.tf'),
      'resource "null_resource" "example" {\n  triggers = {}\n}\n',
    )

    const patch = `diff --git a/main.tf b/main.tf
index abc1234..def5678 100644
--- a/main.tf
+++ b/main.tf
@@ -1,3 +1,3 @@
 resource "null_resource" "example" {
-  triggers = {}
+  triggers = { always_run = true }
 }
`
    await fse.ensureDir(path.join(tmpDir, PATCHES_DIR))
    await writeFile(path.join(tmpDir, PATCHES_DIR, `${module}.patch`), patch)

    const {stdout} = await runCommand('init')
    expect(stdout).to.contain(`Updated module, "${module}"`)

    const updated = await readFile(path.join(moduleDir, 'main.tf'), 'utf8')
    expect(updated).to.contain('always_run = true')
  })
})
