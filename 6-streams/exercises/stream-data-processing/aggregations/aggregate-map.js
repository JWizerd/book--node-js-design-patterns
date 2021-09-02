const CrimeRateByBorough = require("./crime-rate-by-borough");
const CrimeRateByYear = require("./crime-rate-by-year");
const CrimeRateByBoroughToCSV = require("../transformations/crime-rate-by-burough-to-csv");
const CrimeRateByYearToCSV = require("../transformations/crime-rate-by-year-to-csv");
const MostCommonCrimeByBurough = require("./most-common-crime");
const LeastCommonCrimeByBurough = require("./least-common-crime");
const CommonCrimeByBuroughToCSV = require("../transformations/common-crime-to-csv");
const { join } = require("path");

const aggregateMap = {
  burough: {
    aggregate: CrimeRateByBorough,
    transformer: CrimeRateByBoroughToCSV,
    outputFilename: join(__dirname, "..", "csv", "crime-rate-by-burough.csv")
  },
  year: {
    aggregate: CrimeRateByYear,
    transformer: CrimeRateByYearToCSV,
    outputFilename: join(__dirname, "..", "csv", "crime-rate-by-year.csv")
  },
  mostCommonCrime: {
    aggregate: MostCommonCrimeByBurough,
    transformer: CommonCrimeByBuroughToCSV,
    outputFilename: join(__dirname, "..", "csv", "common-crime-by-burough.csv")
  },
  leastCommonCrime: {
    aggregate: LeastCommonCrimeByBurough,
    transformer: CommonCrimeByBuroughToCSV,
    outputFilename: join(__dirname, "..", "csv", "least-common-crime-by-burough.csv")
  },
}

module.exports = aggregateMap;