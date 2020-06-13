const path = require("path");
const fs = require("fs-extra");

module.exports = id => {
  const source = path.join(
    __dirname,
    `../../../content/dist/chunks/${id}/pics`
  );
  if (fs.existsSync(source)) {
    const target = path.join(
      __dirname,
      `../../dist/static/images/chunks/${id}`
    );
    fs.ensureDir(path.join(target, ".."));
    fs.removeSync(target);
    fs.copySync(source, target);
    console.log("images imported for", id);
  } else {
    console.log("No images found for", id);
  }
};
