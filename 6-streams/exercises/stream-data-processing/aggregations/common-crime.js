const { Transform } = require("stream");

class CrimeRateByBorough extends Transform {
  constructor(opts) {
    super({ objectMode: true, ...opts });
    this.crimeRateByBorough = {};
  }

  _transform(record, enc, next) {
    if (this.crimeRateByBorough[record.borough]) {
      this.crimeRateByBorough[record.borough] += parseInt(record.value)
    } else {
      this.crimeRateByBorough[record.borough] = parseInt(record.value);
    }

    next();
  }

  _flush(done) {
    this.push(this.crimeRateByBorough)
    done();
  }
}

module.exports = CrimeRateByBorough;