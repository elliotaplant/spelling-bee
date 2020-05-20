const fs = require('fs');
const { processLineByLine } = require('./fileReading');
const { rand, uniq } = require('./array');

const MIN_LENGTH = 4;
const FULL_LENGTH = 7;

function sortWord(word) {
  return uniq(Array.from(word).sort()).join('');
}

function isFullLength(word) {
  return sortWord(word).length === FULL_LENGTH;
}

function isSpellable(word, bigWordSorted, specialLetter = '') {
  return bigWordSorted.startsWith(sortWord(word)) && word.includes(specialLetter);
}

// pick 1 core letter and 6 other letters
// find all words that can be spelled with core and others
// Check if there is exactly one word that uses all of the letters
// Check that the total set of words is between 15 - 30

// OR

// pick a word with exactly 7 unique letters
async function main() {
  const exactSevens = [];
  let reader = processLineByLine('./seven_words.txt');
  for await (const word of reader) {
    if (isFullLength(word)) {
      exactSevens.push(word);
    }
  }

  const games = [];

  while (games.length < 100) {
    const bigWord = rand(exactSevens);
    console.log('Trying', bigWord);
    const bigWordSorted = sortWord(bigWord);

    const spellable = [];
    reader = processLineByLine('./long_words.txt');
    for await (const word of reader) {
      if (word.length >= MIN_LENGTH && isSpellable(word, bigWordSorted)) {
        spellable.push(word);
      }
    }

    const game = bigWordSorted.split('')
      .reduce((out, letter) => {
        if (out) {
          return out;
        }
        const otherLetters = Array.from(bigWordSorted).filter(l => l !== letter);
        const words = spellable.filter(word => word.includes(letter));
        const numMaxWords = words.filter(word => sortWord(word).length === FULL_LENGTH).length;
        if (numMaxWords === 1 && words.length > 15 && words.length < 30) {
          return { letter, otherLetters, words };
        }
        return null;
      }, null);

    if (game) {
      games.push(game);
    }
  }
  await fs.writeFileSync('games.json', JSON.stringify(games, null, 2));
}

main().catch(console.error);
