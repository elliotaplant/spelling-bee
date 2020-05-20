const { uniq } = require('./array');

class SpellingTree {
  constructor() {
    this.root = { letter: '', words: [], children: [] };
  }

  sortWord(word) {
    return uniq(Array.from(word).sort()).join('');
  }

  insert(word, letter, remainder) {
    const sorted = Array.from(word).sort();
    this.root.insert(sorted);
  }
}


module.exports = SpellingTree;
