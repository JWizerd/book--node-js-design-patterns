const { Transform } = require("stream");
const CommonCrimeSort = require("./common-crime-sort");

class CommonCrimeByBurough extends Transform {
  constructor(leastCommon, opts) {
    this.type = leastCommon ? "min" : "max";
    super({ objectMode: true, ...opts });
    this.crimesByBurough = {};
  }

  _transform(record, enc, next) {
    const { borough, major_category, value } = record;
    if (this.crimesByBurough[borough] && this.crimesByBurough[borough][major_category]) {
      this.crimesByBurough[borough][major_category] += parseInt(value)
    } else {
      this.crimesByBurough[borough] = {}
      this.crimesByBurough[borough][major_category] = parseInt(value)
    }

    next();
  }

  _getCommonCrimes() {
    const commonCrimes = {};
    for (const burough in this.crimesByBurough) {
      const categoriesSorted = new CommonCrimeSort(this.crimesByBurough[burough]).sort();
      commonCrime[burough] = {
        category: categoriesSorted[this.type][0],
        crimes: mostCommonCrime[this.type][1]
      }
    }

    return commonCrimes;
  }

  _flush(done) {
    this.push(this._getMostCommonCrimes())
    done();
  }
}

module.exports = CommonCrimeByBurough;