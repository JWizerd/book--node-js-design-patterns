const BaseTransform = require("./base-transformer");

class CommonCrimeByBuroughToCSV extends BaseTransform {
  constructor(opts) {
    super({ objectMode: true, ...opts });
  }

  _transform(buroughDict, enc, next) {
    for (const burough in buroughDict) {
      this._pushWithBackpressure({
        burough,
        category: buroughDict[burough].category,
        crimes: buroughDict[burough].crimes
      });
    }

    next();
  }
}

module.exports = CommonCrimeByBuroughToCSV;