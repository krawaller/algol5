import { writeTag } from "./helpers";
import fs from "fs-extra";
import path from "path";

const tagId = process.argv[2];

if (!tagId) {
  const tagsDir = path.join(__dirname, "../material/tags");
  const allTags = fs.readdirSync(tagsDir).filter(f => f != ".DS_Store");
  console.log(" ----- writing all tags ----- ");
  for (const d of allTags) {
    writeTag(d);
  }
  console.log(` ------ wrote ${allTags.length} tags `);
} else {
  writeTag(tagId);
}
