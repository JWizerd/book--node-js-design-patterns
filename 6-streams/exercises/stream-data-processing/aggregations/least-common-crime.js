const CommonCrimeByBurough = require("./common-crime");

class LeastCommonCrimeByBurough extends CommonCrimeByBurough {
  constructor(opts) {
    super(true, opts);
  }
}

module.exports = LeastCommonCrimeByBurough;