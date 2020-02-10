import { writeNews } from "./helpers";
import fs from "fs-extra";
import path from "path";

const date = process.argv[2];

if (!date) {
  const newsDir = path.join(__dirname, "../material/news");
  const allNews = fs.readdirSync(newsDir).filter(f => f != ".DS_Store");
  console.log(" ----- writing all news ----- ");
  for (const d of allNews) {
    writeNews(d);
  }
  console.log(` ------ wrote ${allNews.length} news items `);
} else {
  writeNews(date);
}
