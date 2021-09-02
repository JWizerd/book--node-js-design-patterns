const { Transform } = require("stream");

class CommonCrimeByArea extends Transform {
  constructor(opts) {
    if (opts.leastCommon) {
      this.leastCommon = true;
    }

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

  _getMostCommonCrime() {
    const commonCrime = null;
    for (const key in this.crimesByBurough) {
      const burough = this.crimesByBurough[key];
      const values = Object.values(burough);
      const keys = Object.keys(burough);
      const maxCrimeRate = Math.max(...values);
      const indexOfMaxCrimeRate = values.indexOf(maxCrimeRate);
      if (burough[keys[indexOfMaxCrimeRate]] > commonCrime) {}
    }

    return commonCrime;
  }

  _flush(done) {
    this.push(this.crimeRateByBorough)
    done();
  }
}

module.exports = CommonCrimeByArea;