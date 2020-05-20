const fs = require('fs');
const readline = require('readline');

function processLineByLine(filename) {
  const fileStream = fs.createReadStream(filename);

  return readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
}

module.exports = {
  processLineByLine,
};
