function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function uniq(arr) {
  return Array.from(new Set(arr));
}

module.exports = {
  rand,
  uniq
};
