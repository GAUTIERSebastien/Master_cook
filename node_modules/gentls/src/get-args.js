const args = [];
const processArgs = process.argv.slice(2);

processArgs.forEach(arg => {
  if (arg.startsWith('-') && arg != '-r' && arg != '-h') {
    args.push(arg + ' ' + processArgs[processArgs.indexOf(arg)+1]);
  }
  else if (!args.join().includes(arg)) {
    args.push(arg);
  }
});

const { resolve } = require('path');

const hasOutputFilepath = args.join('').includes('-o');
let outputFilepath = args.find(arg => arg.startsWith('-o'));

if (outputFilepath) {
  outputFilepath = outputFilepath.replace('-o ', '');
}

module.exports = {
  hasResetFlag: args.includes('-r'),
  filename: args.find(arg => !arg.startsWith('-')) || process.env.GENTLS_FILENAME || 'default',
  outputFilepath: outputFilepath
    ? resolve(process.env.PWD, outputFilepath)
    : null,
  hasOutputFilepath,
  hasHelpFlag: args.includes('-h'),
};
