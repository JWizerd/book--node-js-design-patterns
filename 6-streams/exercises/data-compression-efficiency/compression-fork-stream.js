const { join } = require("path");
const createMonitorStream = require("./monitor-stream");
const fs = require("fs");
const { pipeline } = require("stream");

module.exports = (readStream, filename, algorithmName, algorithm) => {
  const destFileName = join(__dirname, "compressed", `${algorithmName}-${filename}`);
  const monitorStream = createMonitorStream(filename, algorithmName);

  pipeline(
    readStream,
    algorithm(),
    monitorStream,
    fs.createWriteStream(destFileName),
    err => {
      if (err) {
        console.log(err)
      }
    }
  );
}