tf-patch
=================

Patch terraform modules to fix tiny things. Inspired by [patch-package](https://www.npmjs.com/package/patch-package) and [yarn patch](https://yarnpkg.com/cli/patch) but for terraform modules.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/tf-patch.svg)](https://npmjs.org/package/tf-patch)
[![Downloads/week](https://img.shields.io/npm/dw/tf-patch.svg)](https://npmjs.org/package/tf-patch)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g tf-patch
$ tf-patch COMMAND
running command...
$ tf-patch (--version)
tf-patch/0.0.0 darwin-arm64 node-v20.15.0
$ tf-patch --help [COMMAND]
USAGE
  $ tf-patch COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`tf-patch autocomplete [SHELL]`](#tf-patch-autocomplete-shell)
* [`tf-patch commit FOLDER`](#tf-patch-commit-folder)
* [`tf-patch help [COMMAND]`](#tf-patch-help-command)
* [`tf-patch init`](#tf-patch-init)
* [`tf-patch patch MODULE`](#tf-patch-patch-module)

## `tf-patch autocomplete [SHELL]`

Display autocomplete installation instructions.

```
USAGE
  $ tf-patch autocomplete [SHELL] [-r]

ARGUMENTS
  SHELL  (zsh|bash|powershell) Shell type

FLAGS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

DESCRIPTION
  Display autocomplete installation instructions.

EXAMPLES
  $ tf-patch autocomplete

  $ tf-patch autocomplete bash

  $ tf-patch autocomplete zsh

  $ tf-patch autocomplete powershell

  $ tf-patch autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v3.2.0/src/commands/autocomplete/index.ts)_

## `tf-patch commit FOLDER`

This command will generate a git diff of tmp module with changes and the original terraform module and save it to be committed in the repo

```
USAGE
  $ tf-patch commit FOLDER

ARGUMENTS
  FOLDER  Folder with changed files

DESCRIPTION
  This command will generate a git diff of tmp module with changes and the original terraform module and save it to be
  committed in the repo

EXAMPLES
  $ tf-patch commit /var/folders/tmp-10011-DygKbYjnYckl/module
```

_See code: [src/commands/commit/index.ts](https://github.com/rohit-gohri/terraform-patch/blob/v0.0.0/src/commands/commit/index.ts)_

## `tf-patch help [COMMAND]`

Display help for tf-patch.

```
USAGE
  $ tf-patch help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for tf-patch.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.8/src/commands/help.ts)_

## `tf-patch init`

This command will apply any patches found in the .patches directory to the corresponding terraform modules

```
USAGE
  $ tf-patch init

DESCRIPTION
  This command will apply any patches found in the .patches directory to the corresponding terraform modules

EXAMPLES
  $ tf-patch init
```

_See code: [src/commands/init/index.ts](https://github.com/rohit-gohri/terraform-patch/blob/v0.0.0/src/commands/init/index.ts)_

## `tf-patch patch MODULE`

This command will cause a package to be extracted in a temporary directory

```
USAGE
  $ tf-patch patch MODULE

ARGUMENTS
  MODULE  Module to patch

DESCRIPTION
  This command will cause a package to be extracted in a temporary directory
  intended to be editable at will.

EXAMPLES
  $ tf-patch patch gke-cluster
```

_See code: [src/commands/patch/index.ts](https://github.com/rohit-gohri/terraform-patch/blob/v0.0.0/src/commands/patch/index.ts)_
<!-- commandsstop -->
