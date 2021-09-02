const CommonCrimeByBurough = require("./common-crime");
const CommonCrimeSort = require("./common-crime-sort");

class MostCommonCrimeByBurough extends CommonCrimeByBurough {
  _getCommonCrimes() {
    const commonCrimes = {};
    for (const burough in this.crimesByBurough) {
      const crimeSort = new CommonCrimeSort(this.crimesByBurough[burough]);
      crimeSort.sort();
      if (crimeSort.max[1] > 0) {
        commonCrimes[burough] = {
          category: crimeSort.max[0],
          crimes: crimeSort.max[1]
        }
      }
    }

    return commonCrimes;
  }
}

module.exports = MostCommonCrimeByBurough;