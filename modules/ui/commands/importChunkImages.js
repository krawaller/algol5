const path = require("path");
const fs = require("fs-extra");
const importChunkImages = require("./helpers/importChunkImages");

const chunkId = process.argv[2];

if (!chunkId) {
  console.log("---------- importing all chunk content images ---------- ");
  const chunkDir = path.join(__dirname, "../../content/material/chunks");
  const allChunks = fs.readdirSync(chunkDir).filter(f => f != ".DS_Store");
  console.log(" ----- writing all chunks ----- ");
  for (const d of allChunks) {
    importChunkImages(d);
  }
  console.log("------- all chunks content images imported---------- ");
} else {
  importChunkImages(chunkId);
}
