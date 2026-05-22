#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Remove lock files
const files = ['package-lock.json', 'yarn.lock'];
for (const file of files) {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`Removed ${file}`);
  }
}

// Check if pnpm is being used
const userAgent = process.env.npm_config_user_agent || '';
if (!userAgent.includes('pnpm')) {
  console.error('Use pnpm instead');
  process.exit(1);
}

console.log('✓ Preinstall checks passed');
