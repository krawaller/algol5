const path = require("path");
const fs = require("fs-extra");
const importTagImages = require("./helpers/importTagImages");

const tagId = process.argv[2];

if (!tagId) {
  console.log("---------- importing all tags content images ---------- ");
  const tagDir = path.join(__dirname, "../../content/material/tags");
  const allTags = fs.readdirSync(tagDir).filter(f => f != ".DS_Store");
  console.log(" ----- writing all tags ----- ");
  for (const d of allTags) {
    importTagImages(d);
  }
  console.log("------- all tags content images imported---------- ");
} else {
  importTagImages(tagId);
}
