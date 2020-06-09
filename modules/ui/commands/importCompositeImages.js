const path = require("path");
const fs = require("fs-extra");

const compositeRoot = path.join(__dirname, "../../payloads/dist/composites");
const outRoot = path.join(__dirname, "../dist/static/images/composites");

fs.ensureDirSync(outRoot);

fs.readdirSync(compositeRoot)
  .filter(f => f !== ".DS_Store")
  .forEach(c =>
    fs.copyFileSync(
      path.join(compositeRoot, c, `${c}.jpg`),
      path.join(outRoot, `${c}.jpg`)
    )
  );

console.log("Composite images imported");
