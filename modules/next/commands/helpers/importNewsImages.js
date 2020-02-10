const path = require("path");
const fs = require("fs-extra");

module.exports = importNewsImages = date => {
  const source = path.join(
    __dirname,
    `../../../content/material/news/${date}/pics`
  );
  if (fs.existsSync(source)) {
    const target = path.join(__dirname, `../../public/images/news/${date}`);
    fs.ensureDir(path.join(__dirname, `../../public/images/news`));
    fs.removeSync(target);
    fs.copySync(source, target);
    console.log("images imported for", date);
  } else {
    console.log("No images found for", date);
  }
};
