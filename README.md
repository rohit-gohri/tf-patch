tf-patch
=================

Patch terraform modules to fix tiny things. Inspired by [patch-package](https://www.npmjs.com/package/patch-package) and [yarn patch](https://yarnpkg.com/cli/patch) but for terraform modules.

Simply patch any terraform module using git patches:

1. `npx tf-patch patch <module>` - Copy terraform module so patch can be generated from changes
1. `npx tf-patch commit <modified-module-folder>` - Generate .patch file that can be committed to .patches folder
1. `npx tf-patch init` - Apply patches to downloaded terraform modules

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
tf-patch/0.1.2 darwin-arm64 node-v20.15.0
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
* [`tf-patch version`](#tf-patch-version)

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

_See code: [src/commands/commit/index.ts](https://github.com/rohit-gohri/tf-patch/blob/v0.1.2/src/commands/commit/index.ts)_

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

_See code: [src/commands/init/index.ts](https://github.com/rohit-gohri/tf-patch/blob/v0.1.2/src/commands/init/index.ts)_

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

_See code: [src/commands/patch/index.ts](https://github.com/rohit-gohri/tf-patch/blob/v0.1.2/src/commands/patch/index.ts)_

## `tf-patch version`

```
USAGE
  $ tf-patch version [--json] [--verbose]

FLAGS
  --verbose  Show additional information about the CLI.

GLOBAL FLAGS
  --json  Format output as json.

FLAG DESCRIPTIONS
  --verbose  Show additional information about the CLI.

    Additionally shows the architecture, node version, operating system, and versions of plugins that the CLI is using.
```

_See code: [@oclif/plugin-version](https://github.com/oclif/plugin-version/blob/v2.2.11/src/commands/version.ts)_
<!-- commandsstop -->
