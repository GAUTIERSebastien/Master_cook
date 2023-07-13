const {
  existsSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
} = require('fs');
const scriptGentls = require('./script-to-include');
const debugGentls = require('util').debuglog('gentls');
const { dirname, sep, resolve } = require('path');

let { outputFilepath, hasOutputFilepath } = require('./get-args');

if (hasOutputFilepath && existsSync(outputFilepath)) {
  debugGentls("File exists: it's ok");
  const content = readFileSync(outputFilepath, { encoding: 'utf-8' });
  writeIntoFile(scriptGentls+content);
}
else if (hasOutputFilepath) {
  debugGentls("File not exists --> creating...");
  const folderpath = dirname(outputFilepath);
  try {
    mkdirSync(folderpath, { recursive: true });
    writeIntoFile(scriptGentls);
  }
  catch (e) {
    console.error(e);
  }
}

function writeIntoFile(content) {
  writeFileSync(
    outputFilepath,
    content,
    { encoding: 'utf-8' }
  );
}
