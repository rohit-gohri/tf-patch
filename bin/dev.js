#!/usr/bin/env -S node --loader ts-node/esm --disable-warning=ExperimentalWarning

// eslint-disable-next-line n/shebang
import {execute, getLogger} from '@oclif/core'

const logger = getLogger('tf-fetch')

await execute({
  development: true,
  dir: import.meta.url,
  loadOptions: {
    logger,
    root: import.meta.dirname,
  },
})
