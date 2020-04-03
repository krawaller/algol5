const path = require("path");
const fs = require("fs-extra");
const importAboutImages = require("./helpers/importAboutImages");

const id = process.argv[2];

if (!id) {
  console.log("---------- importing all about content images ---------- ");
  const aboutDir = path.join(__dirname, "../../content/material/about");
  const allAbout = fs.readdirSync(aboutDir).filter(f => f != ".DS_Store");
  console.log(" ----- writing all about ----- ");
  for (const d of allAbout) {
    importAboutImages(d);
  }
  console.log("------- all about content images imported---------- ");
} else {
  importAboutImages(id);
}
