const fs = require("fs");
const aggregateType = process.argv[2];
const createAggregate = require("./aggregations/create-aggregate");
const aggregateMap = require("./aggregations/aggregate-map");
const { join } = require("path");

function main() {
  try {
    if (aggregateType && !aggregateMap[aggregateType]) {
      throw new Error("No aggregate of that type. Please try again.");
    }

    const csvReadStream = fs.createReadStream(join(__dirname, "london_crime_by_lsoa.csv"));

    if (aggregateType) {
      return createAggregate(csvReadStream, aggregateType);
    }

    for (const key in aggregateMap) {
      createAggregate(csvReadStream, key);
    }
  } catch(error) {
    console.error(error);
  }
}

main();
