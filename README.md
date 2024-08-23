tf-patch
=================

Patch terraform modules to fix tiny things


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
* [`tf-patch hello PERSON`](#tf-patch-hello-person)
* [`tf-patch hello world`](#tf-patch-hello-world)
* [`tf-patch help [COMMAND]`](#tf-patch-help-command)
* [`tf-patch plugins`](#tf-patch-plugins)
* [`tf-patch plugins add PLUGIN`](#tf-patch-plugins-add-plugin)
* [`tf-patch plugins:inspect PLUGIN...`](#tf-patch-pluginsinspect-plugin)
* [`tf-patch plugins install PLUGIN`](#tf-patch-plugins-install-plugin)
* [`tf-patch plugins link PATH`](#tf-patch-plugins-link-path)
* [`tf-patch plugins remove [PLUGIN]`](#tf-patch-plugins-remove-plugin)
* [`tf-patch plugins reset`](#tf-patch-plugins-reset)
* [`tf-patch plugins uninstall [PLUGIN]`](#tf-patch-plugins-uninstall-plugin)
* [`tf-patch plugins unlink [PLUGIN]`](#tf-patch-plugins-unlink-plugin)
* [`tf-patch plugins update`](#tf-patch-plugins-update)

## `tf-patch hello PERSON`

Say hello

```
USAGE
  $ tf-patch hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ tf-patch hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/rohit-gohri/terraform-patch/blob/v0.0.0/src/commands/hello/index.ts)_

## `tf-patch hello world`

Say hello world

```
USAGE
  $ tf-patch hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ tf-patch hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/rohit-gohri/terraform-patch/blob/v0.0.0/src/commands/hello/world.ts)_

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

## `tf-patch plugins`

List installed plugins.

```
USAGE
  $ tf-patch plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ tf-patch plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.4/src/commands/plugins/index.ts)_

## `tf-patch plugins add PLUGIN`

Installs a plugin into tf-patch.

```
USAGE
  $ tf-patch plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into tf-patch.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the TF_PATCH_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the TF_PATCH_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ tf-patch plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ tf-patch plugins add myplugin

  Install a plugin from a github url.

    $ tf-patch plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ tf-patch plugins add someuser/someplugin
```

## `tf-patch plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ tf-patch plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ tf-patch plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.4/src/commands/plugins/inspect.ts)_

## `tf-patch plugins install PLUGIN`

Installs a plugin into tf-patch.

```
USAGE
  $ tf-patch plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into tf-patch.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the TF_PATCH_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the TF_PATCH_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ tf-patch plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ tf-patch plugins install myplugin

  Install a plugin from a github url.

    $ tf-patch plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ tf-patch plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.4/src/commands/plugins/install.ts)_

## `tf-patch plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ tf-patch plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ tf-patch plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.4/src/commands/plugins/link.ts)_

## `tf-patch plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ tf-patch plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ tf-patch plugins unlink
  $ tf-patch plugins remove

EXAMPLES
  $ tf-patch plugins remove myplugin
```

## `tf-patch plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ tf-patch plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.4/src/commands/plugins/reset.ts)_

## `tf-patch plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ tf-patch plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ tf-patch plugins unlink
  $ tf-patch plugins remove

EXAMPLES
  $ tf-patch plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.4/src/commands/plugins/uninstall.ts)_

## `tf-patch plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ tf-patch plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ tf-patch plugins unlink
  $ tf-patch plugins remove

EXAMPLES
  $ tf-patch plugins unlink myplugin
```

## `tf-patch plugins update`

Update installed plugins.

```
USAGE
  $ tf-patch plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.4/src/commands/plugins/update.ts)_
<!-- commandsstop -->
