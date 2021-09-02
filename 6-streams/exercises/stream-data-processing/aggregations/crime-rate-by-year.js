const { Transform } = require("stream");

class CrimeRateByYear extends Transform {
  constructor(opts) {
    super({ objectMode: true, ...opts });
    this.crimeRatesByYears = {};
  }

  _transform(record, enc, next) {
    if (this.crimeRatesByYears[record.year]) {
      this.crimeRatesByYears[record.year] += parseInt(record.value)
    } else {
      this.crimeRatesByYears[record.year] = parseInt(record.value);
    }

    // this notifies the transform stream that the transformation is complete which then triggers _onComplete
    next();
  }

  /**
   * flush runs that the end of the transform stream.
   * It's a method used to clean up everything before
   * moving onto the next operation
   * @param {*} done
   */
  _flush(done) {
    this.push(this.crimeRatesByYears)
    done();
  }
}

module.exports = CrimeRateByYear;