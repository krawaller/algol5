import { writeChunk } from "./helpers";
import fs from "fs-extra";
import path from "path";

const id = process.argv[2];

if (!id) {
  const chunksDir = path.join(__dirname, "../material/chunks");
  const allChunk = fs.readdirSync(chunksDir).filter(f => f != ".DS_Store");
  console.log(" ----- writing all chunks ----- ");
  for (const d of allChunk) {
    writeChunk(d);
  }
  console.log(` ------ wrote ${allChunk.length} chunks items `);
} else {
  writeChunk(id);
}
