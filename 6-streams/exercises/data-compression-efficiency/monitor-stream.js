const { PassThrough } = require("stream");
const fs = require("fs");

module.exports = (filename, algorithmName) => {
  const monitor = new PassThrough();
  const originalFileSize = fs.statSync(filename).size;
  let compressedFileSize = 0;
  const start = Date.now();
  const stats = {
    algorithmName
  };

  monitor.on("data", (chunk) => {
    compressedFileSize += chunk.length
    stats.compressionPercentage = 100 - (compressedFileSize / originalFileSize * 100);
  });

  monitor.on("finish", () => {
    stats.timeInMs = Date.now() - start;
    console.table(stats);
  });

  return monitor;
}