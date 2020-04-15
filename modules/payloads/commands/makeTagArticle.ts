import fs from "fs-extra";
import path from "path";
import { makeTagArticle } from "./helpers/makeTagArticle";

const tagId = process.argv[2];

if (!tagId) {
  console.log("---------- making articles for all tags ---------- ");
  const tagsDir = path.join(__dirname, "../../content/material/tags");
  const allTags = fs.readdirSync(tagsDir).filter(f => f != ".DS_Store");

  for (const tagId of allTags) {
    makeTagArticle(tagId);
  }
  console.log("------- all tags got articles ---------- ");
} else {
  makeTagArticle(tagId);
}
