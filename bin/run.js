#!/usr/bin/env node

import {execute, getLogger} from '@oclif/core'

const logger = getLogger('tf-fetch')

await execute({
  dir: import.meta.url,
  loadOptions: {
    logger,
    root: import.meta.dirname,
  },
})
