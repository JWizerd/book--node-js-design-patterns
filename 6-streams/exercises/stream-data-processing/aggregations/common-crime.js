const { Transform } = require("stream");

class CommonCrimeByBurough extends Transform {
  constructor(opts) {
    super({ objectMode: true, ...opts });
    this.crimesByBurough = {};
  }

  _transform(record, enc, next) {
    const { borough, major_category, value } = record;
    if (this.crimesByBurough[borough] && this.crimesByBurough[borough][major_category]) {
      this.crimesByBurough[borough][major_category] += parseInt(value)
    } else {
      this.crimesByBurough[borough] = this.crimesByBurough[borough] || {};
      this.crimesByBurough[borough][major_category] = parseInt(value)
    }

    next();
  }

  _getCommonCrimes() {
    throw new Error("must implement _getCommonCrimes");
  }

  _flush(done) {
    this.push(this._getCommonCrimes())
    done();
  }
}

module.exports = CommonCrimeByBurough;