import { writeAbout } from "./helpers";
import fs from "fs-extra";
import path from "path";

const date = process.argv[2];

if (!date) {
  const aboutDir = path.join(__dirname, "../material/about");
  const allAbout = fs.readdirSync(aboutDir).filter(f => f != ".DS_Store");
  console.log(" ----- writing all about articles ----- ");
  for (const d of allAbout) {
    writeAbout(d);
  }
  console.log(` ------ wrote ${allAbout.length} about items `);
} else {
  writeAbout(date);
}
