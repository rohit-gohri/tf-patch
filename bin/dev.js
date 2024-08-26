#!/usr/bin/env -S node --loader ts-node/esm --disable-warning=ExperimentalWarning

// eslint-disable-next-line n/shebang
import {execute} from '@oclif/core'

// eslint-disable-next-line n/no-unpublished-import
import {logger} from '../src/logger.ts'

await execute({
  development: true,
  dir: import.meta.url,
  loadOptions: {
    logger,
    root: import.meta.dirname,
  },
})
