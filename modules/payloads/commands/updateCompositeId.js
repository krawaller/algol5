const fs = require("fs-extra");
const path = require("path");

const out = path.join(__dirname, "../dist");
const guid = Math.random()
  .toString()
  .slice(2);

const code = `module.exports = '${guid}';
`;

fs.ensureDirSync(out);
fs.writeFileSync(path.join(out, "compositeId.js"), code);

console.log("Composite id updated to", guid);
