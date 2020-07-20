const path = require("path");
const fs = require("fs-extra");
const compositeId = require("../../payloads/dist/compositeId");

const compositeRoot = path.join(__dirname, "../../payloads/dist/composites");
const outRoot = path.join(__dirname, "../dist/static/images/composites");

fs.ensureDirSync(outRoot);

fs.readdirSync(compositeRoot)
  .filter(f => f !== ".DS_Store")
  .forEach(c =>
    fs.copyFileSync(
      path.join(compositeRoot, c, `${c}_${compositeId}.png`),
      path.join(outRoot, `${c}_${compositeId}.png`)
    )
  );

console.log("Composite images imported");
