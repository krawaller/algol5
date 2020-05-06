const fs = require("fs-extra");
const path = require("path");
const fm = require("front-matter");
const tagsFolder = path.join(__dirname, "../material/tags");
const prettier = require("prettier");

const tagId = process.argv[2];

const allTags = fs
  .readdirSync(tagsFolder)
  .filter(f => f != ".DS_Store")
  .map(t => fs.readFileSync(path.join(tagsFolder, t, "tag.md")).toString())
  .map(file => fm(file).attributes)
  .reduce((memo, t) => ({ ...memo, [t.id]: t }), {});

const out = path.join(__dirname, "../dist/tagIndex.js");
const code = prettier.format(
  `export const tagIndex = ${JSON.stringify(
    allTags
  )}; export default tagIndex;`,
  { filepath: "foo.ts" }
);

fs.writeFileSync(out, code);
console.log("Tag index written");
