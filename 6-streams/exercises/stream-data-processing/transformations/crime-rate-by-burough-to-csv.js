const BaseTransform = require("./base-transformer");

class CrimeRateByBoroughToCSV extends BaseTransform {
  constructor(opts) {
    super({ objectMode: true, ...opts });
  }

  _transform(buroughDict, enc, next) {
    for (const burough in buroughDict) {
      this._pushWithBackpressure({
        burough,
        crimes: buroughDict[burough]
      });
    }

    // this notifies the transform stream that the transformation is complete which then triggers _onComplete
    next();
  }
}

module.exports = CrimeRateByBoroughToCSV;