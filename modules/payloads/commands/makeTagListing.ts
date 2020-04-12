import fs from "fs-extra";
import path from "path";
import { makeTagListing } from "./helpers/makeTagListing";

const tagId = process.argv[2];

if (!tagId) {
  console.log("---------- making listings for all games ---------- ");
  const tagsDir = path.join(__dirname, "../../content/material/tags");
  const allTags = fs.readdirSync(tagsDir).filter(f => f != ".DS_Store");

  for (const tagId of allTags) {
    makeTagListing(tagId);
  }
  console.log("------- all games got listings ---------- ");
} else {
  makeTagListing(tagId);
}
