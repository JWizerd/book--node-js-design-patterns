const { Transform } = require("stream");

class BaseTransform extends Transform {
  constructor(opts) {
    super({ objectMode: true, ...opts });
  }

  _pushWithBackpressure (chunk, encoding) {
    if (!this.push(chunk, encoding)) {
      this.once('drain', () => this._pushWithBackpressure(chunk, encoding))
    }
  }
}

module.exports = BaseTransform;