const fs = require('fs').promises;
const { processLineByLine } = require('./fileReading');
const { uniq } = require('./array');

function sortWord(word) {
  return uniq(Array.from(word).sort()).join('');
}

async function main() {
  const reader = processLineByLine('./all_words.txt');
  for await (const word of reader) {
    if (sortWord(word).length === 7) {
      await fs.appendFile('seven_words2.txt', word + '\n');
    }
  }
}

main().catch(console.error);
