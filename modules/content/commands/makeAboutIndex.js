const fs = require("fs-extra");
const path = require("path");
const fm = require("front-matter");
const aboutFolder = path.join(__dirname, "../material/about");
const prettier = require("prettier");

const allAbout = fs
  .readdirSync(aboutFolder)
  .filter(f => f != ".DS_Store")
  .map(t => fs.readFileSync(path.join(aboutFolder, t, "about.md")).toString())
  .map(file => fm(file).attributes)
  .reduce((memo, t) => ({ ...memo, [t.id]: t }), {});

const dist = path.join(__dirname, "../dist");
fs.ensureDirSync(dist);
const out = path.join(dist, "aboutIndex.js");

const code = prettier.format(
  `export const aboutIndex = ${JSON.stringify(
    allAbout
  )}; export default aboutIndex;`,
  { filepath: "foo.ts" }
);

fs.writeFileSync(out, code);
console.log("About index written");
