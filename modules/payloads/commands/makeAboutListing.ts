import fs from "fs-extra";
import path from "path";
import { makeAboutListing } from "./helpers/makeAboutListing";

const aboutId = process.argv[2];

if (!aboutId) {
  console.log("---------- making listings for all about ---------- ");
  const aboutDir = path.join(__dirname, "../../content/material/about");
  const allAbout = fs.readdirSync(aboutDir).filter(f => f != ".DS_Store");

  for (const aboutId of allAbout) {
    makeAboutListing(aboutId);
  }
  console.log("------- all about got listings ---------- ");
} else {
  makeAboutListing(aboutId);
}
