const fs = require("fs-extra");
const path = require("path");

const folder = path.join(__dirname, "../src/static/images");
const out = path.join(__dirname, "../base64");

fs.emptyDirSync(out);

const support = ["png", "svg"];

for (const f of fs.readdirSync(folder)) {
  const ext = path.extname(f).substr(1);
  if (support.includes(ext)) {
    const data = fs.readFileSync(path.join(folder, f));
    const base64 = `data:image/${
      ext === "svg" ? "svg+xml" : ext
    };base64,${data.toString("base64")}`;
    fs.writeFileSync(
      path.join(out, f + ".proxy.js"),
      `export default \`${base64}\`;\n`
    );
    console.log("Writing base64 version of", f);
  }
}
