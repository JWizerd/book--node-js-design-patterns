const BaseTransform = require("./base-transformer");

class CrimeRateByYearToCSV extends BaseTransform {
  constructor(opts) {
    super({ objectMode: true, ...opts });
  }

  _transform(yearDict, enc, next) {
    for (const year in yearDict) {
      this._pushWithBackpressure({
        year,
        crimes: yearDict[year]
      });
    }

    // this notifies the transform stream that the transformation is complete which then triggers _onComplete
    next();
  }
}

module.exports = CrimeRateByYearToCSV;