const path = require("path");
const fs = require("fs-extra");

module.exports = date => {
  const source = path.join(
    __dirname,
    `../../../content/dist/news/${date}/pics`
  );
  if (fs.existsSync(source)) {
    const target = path.join(
      __dirname,
      `../../dist/static/images/news/${date}`
    );
    fs.ensureDir(path.join(target, ".."));
    fs.removeSync(target);
    fs.copySync(source, target);
    console.log("images imported for", date);
  } else {
    console.log("No images found for", date);
  }
};
