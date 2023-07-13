#!/usr/bin/env node

const { mkdirSync, existsSync, writeFileSync, rmSync } = require('fs');
const { hasResetFlag, filename } = require('../src/get-args');
const { execSync } = require('child_process');
const { resolve, join } = require('path');

if (!filename) {
  console.error(`\n> [GENTLS ERROR]: ┐(\´•_•\`)┌\n>\n> You must give a filename without extension\n> Command usage → gentls <filename>\n> Example → gentls my-file
  `);
  process.exit(1);
}

process.env.GENTLS_FILENAME = filename;

const sslDir = resolve('ssl');
if (existsSync(sslDir) && hasResetFlag) {
  rmSync(sslDir, { recursive: true });
}
if (!existsSync(sslDir)) {
  mkdirSync(sslDir, { mode: '0777' });
}
const opensslCmd = `openssl req -x509 -sha256 -newkey rsa:2048 -days 365 -nodes -out ssl/${filename}.crt -keyout ssl/${filename}.key -subj "/C=Fr"`;

writeFileSync(join(sslDir, '.gitkeep'), '');
execSync(opensslCmd);

require('../src/inject-code-into-file');