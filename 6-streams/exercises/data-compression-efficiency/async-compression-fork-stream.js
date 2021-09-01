const { join } = require("path");
const createMonitorStream = require("./monitor-stream");
const fs = require("fs");

module.exports = async (readStream, filename, algorithmName, algorithm) => {
  const destFileName = join(__dirname, "compressed", `${algorithmName}-${filename}`);
  const monitorStream = createMonitorStream(filename, algorithmName);

  return new Promise((resolve, reject) => {
    readStream
      .pipe(algorithm())
      .pipe(monitorStream)
      .pipe(fs.createWriteStream(destFileName))
      .on("error", reject);

    resolve();
  });
}