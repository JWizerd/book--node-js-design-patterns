/**
 * Write a command-line script that takes a file as input and compresses
 * it using the different algorithms available in the zlib module (Brotli, Deflate, Gzip).
 * You want to produce a summary table that compares the algorithm's compression time and
 * compression efficiency.
 */

const fs = require("fs");
const { createBrotliCompress, createGzip, createDeflate } = require("zlib");
const filename = process.argv[2];
const algorithmName = process.argv[3];
const compressFile = require("./async-compression-fork-stream");
const algorithms = {
  deflate: createDeflate,
  brotli: createBrotliCompress,
  gzip: createGzip
}

async function main () {
  try {
    const readStream = fs.createReadStream(filename);

    if (algorithms[algorithmName]) {
      await compressFile(
        readStream,
        filename,
        algorithmName,
        algorithms[algorithmName]
      );
    } else {
      for (const algo in algorithms) {
        await compressFile(
          readStream,
          filename,
          algo,
          algorithms[algo]
        );
      }
    }
  } catch (error) {
    console.error(error);
  }
};

main();
