const fs = require("fs");
const csvParser = require('csv-parser');
const csvWriter = require('csv-write-stream');
const { pipeline } = require("stream");
const aggregateType = process.argv[2];
const CrimeRateByBorough = require("./aggregations/crime-rate-by-borough");
const CrimeRateByYear = require("./aggregations/crime-rate-by-year");
const CrimeRateByBoroughToCSV = require("./transformations/crime-rate-by-burough-to-csv");
const CrimeRateByYearToCSV = require("./transformations/crime-rate-by-year-to-csv");
const { join } = require("path");
const aggregateMap = {
  burough: {
    aggregate: CrimeRateByBorough,
    transformer: CrimeRateByBoroughToCSV,
    outputFilename: join(__dirname, "csv", "crime-rate-by-burough.csv")
  },
  year: {
    aggregate: CrimeRateByYear,
    transformer: CrimeRateByYearToCSV,
    outputFilename: join(__dirname, "csv", "crime-rate-by-year.csv")
  }
}

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



function main() {
  try {
    if (aggregateType && !aggregateMap[aggregateType]) {
      throw new Error("No aggregate of that type. Please try again.");
    }

    const csvReadStream = fs.createReadStream(join(__dirname, "london_crime_by_lsoa.csv"));

    if (aggregateType) {
      return createAggregate(csvWriteStream, aggregateType);
    }

    for (const key in aggregateMap) {
      createAggregate(csvReadStream, key);
    }
  } catch(error) {
    console.error(error);
  }
}

main();
