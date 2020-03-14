const path = require("path");
const fs = require("fs-extra");

module.exports = gameId => {
  const source = path.join(
    __dirname,
    `../../../content/material/games/${gameId}/pics`
  );
  if (fs.existsSync(source)) {
    const target = path.join(__dirname, `../../public/images/games/${gameId}`);
    fs.ensureDir(path.join(__dirname, `../../public/images/games`));
    fs.removeSync(target);
    fs.copySync(source, target);
    console.log("images imported for", gameId);
  } else {
    console.log("No images found for", gameId);
  }
};
