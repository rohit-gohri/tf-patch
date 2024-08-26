#!/usr/bin/env node

import {execute} from '@oclif/core'

import {logger} from '../dist/logger.js'

await execute({
  dir: import.meta.url,
  loadOptions: {
    logger,
    root: import.meta.dirname,
  },
})
