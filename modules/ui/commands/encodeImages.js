const fs = require("fs-extra");
const path = require("path");

const folder = path.join(__dirname, "../dist/static/images");
const out = path.join(__dirname, "../dist/base64");

const img2data = require("../../graphics/img2data");

fs.emptyDirSync(out);

const support = ["png", "svg"];

// TODO - this only handles images in static/images, but now we have images in static/images/news, static/images/games too...

for (const f of fs.readdirSync(folder)) {
  const ext = path.extname(f).substr(1);
  const fullPath = path.join(folder, f);
  if (fs.statSync(fullPath).isFile()) {
    try {
      const base64 = img2data(path.join(folder, f));
      fs.writeFileSync(
        path.join(out, f + ".proxy.js"),
        `export default \`${base64}\`;\n`
      );
      console.log("Writing base64 version of", f);
    } catch (e) {
      console.log("No base64 img possible for", f);
    }
  }
}
