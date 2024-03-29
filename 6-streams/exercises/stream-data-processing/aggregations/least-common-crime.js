const CommonCrimeByBurough = require("./common-crime");
const CommonCrimeSort = require("./common-crime-sort");

class LeastCommonCrimeByBurough extends CommonCrimeByBurough {
  _getCommonCrimes() {
    const commonCrimes = {};
    for (const burough in this.crimesByBurough) {
      const crimeSort = new CommonCrimeSort(this.crimesByBurough[burough]);
      crimeSort.sort();
      commonCrimes[burough] = {
        category: crimeSort.min[0],
        crimes: crimeSort.min[1]
      }
    }

    return commonCrimes;
  }
}

module.exports = LeastCommonCrimeByBurough;