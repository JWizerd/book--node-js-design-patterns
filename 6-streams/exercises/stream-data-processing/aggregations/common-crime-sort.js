class CommonCrimeSort {
  constructor(object) {
    this.entries = Object.entries(object).sort((prev, next) => prev[1] - next[1]);
  }

  get max() {
    return this.entries[this.entries.length - 1];
  }

  get min() {
    return this.entries[0];
  }
}

module.exports = CommonCrimeSort;