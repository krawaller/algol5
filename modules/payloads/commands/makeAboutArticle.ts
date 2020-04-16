import fs from "fs-extra";
import path from "path";
import { makeAboutArticle } from "./helpers/makeAboutArticle";

const aboutId = process.argv[2];

if (!aboutId) {
  console.log("---------- making articles for all about ---------- ");
  const aboutDir = path.join(__dirname, "../../content/material/about");
  const allAbout = fs.readdirSync(aboutDir).filter(f => f != ".DS_Store");

  for (const aboutId of allAbout) {
    makeAboutArticle(aboutId);
  }
  console.log("------- all about got articles ---------- ");
} else {
  makeAboutArticle(aboutId);
}
