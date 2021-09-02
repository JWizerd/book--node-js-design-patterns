const fs = require("fs");
const csvParser = require('csv-parser');
const csvWriter = require('csv-write-stream');
const { pipeline } = require("stream");
const aggregateMap = require("./aggregate-map");

const createAggregate = (readStream, type) => {
    const start = Date.now();
    const onComplete = err => {
      if (err) {
        console.error(err);
      } else {
        const end = Date.now();
        console.info(`
          Aggreation: ${type} - Complete.\n
          TIME: ${(end - start) / 1000}s
        `);
      }
    };

    pipeline(
      readStream,
      csvParser({ columns: true }),
      new aggregateMap[type].aggregate(),
      new aggregateMap[type].transformer(),
      csvWriter(),
      fs.createWriteStream(aggregateMap[type].outputFilename),
      onComplete
    );
}

module.exports = createAggregate;