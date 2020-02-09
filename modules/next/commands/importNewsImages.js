const path = require("path");
const fs = require("fs-extra");
const importNewsImages = require("./helpers/importNewsImages");

const date = process.argv[2];

if (!date) {
  console.log("---------- importing all news content images ---------- ");
  const newsDir = path.join(__dirname, "../../content/material/news");
  const allNews = fs.readdirSync(newsDir).filter(f => f != ".DS_Store");
  console.log(" ----- writing all news ----- ");
  for (const d of allNews) {
    importNewsImages(d);
  }
  console.log("------- all news content images imported---------- ");
} else {
  importNewsImages(date);
}
