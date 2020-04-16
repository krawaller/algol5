import fs from "fs-extra";
import path from "path";
import { makeNewsArticle } from "./helpers/makeNewsArticle";

const newsId = process.argv[2];

if (!newsId) {
  console.log("---------- making articles for all news ---------- ");
  const newsDir = path.join(__dirname, "../../content/material/news");
  const allNews = fs.readdirSync(newsDir).filter(f => f != ".DS_Store");

  for (const newsId of allNews) {
    makeNewsArticle(newsId);
  }
  console.log("------- all news got articles ---------- ");
} else {
  makeNewsArticle(newsId);
}
