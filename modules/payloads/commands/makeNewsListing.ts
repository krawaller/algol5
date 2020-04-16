import fs from "fs-extra";
import path from "path";
import { makeNewsListing } from "./helpers/makeNewsListing";

const newsId = process.argv[2];

if (!newsId) {
  console.log("---------- making listings for all news ---------- ");
  const newsDir = path.join(__dirname, "../../content/material/news");
  const allNews = fs.readdirSync(newsDir).filter(f => f != ".DS_Store");

  for (const newsId of allNews) {
    makeNewsListing(newsId);
  }
  console.log("------- all news got listings ---------- ");
} else {
  makeNewsListing(newsId);
}
