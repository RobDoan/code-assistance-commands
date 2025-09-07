#!/usr/bin/env node

import { main } from './index';

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});