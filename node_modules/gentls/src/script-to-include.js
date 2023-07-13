module.exports = `/* Added by gentls */
const getFile = (ext) => createFileSync(
  join(
    process.env.PWD,
    'ssl',
    \`${process.env.GENTLS_FILENAME}\${ext}\`
  )
);
const cert = getFile('.crt');
const key = getFile('.key');\n\n`;
