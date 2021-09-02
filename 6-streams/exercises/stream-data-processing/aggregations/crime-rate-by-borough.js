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
    // push appends the chunk of data to an internal buffer which then passed down the pipeline
    // for chunks of data that have a relationship such as bytes push runs on every transformation iteration
    // in this case, since it's an aggregate we wait to push the data until the end of the transformation.
    this.push(this.crimeRateByBorough)
    done();
  }
}

module.exports = CrimeRateByBorough;