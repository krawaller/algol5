const path = require("path");
const fs = require("fs-extra");

module.exports = gameId => {
  const targetDir = path.join(
    __dirname,
    `../../dist/static/images/games/${gameId}`
  );
  fs.ensureDirSync(path.join(targetDir, ".."));
  // content images
  const contentSource = path.join(
    __dirname,
    `../../../content/dist/games/${gameId}/pics`
  );
  if (fs.existsSync(contentSource)) {
    fs.removeSync(targetDir);
    fs.copySync(contentSource, targetDir);
    console.log("images imported for", gameId);
  } else {
    console.log("No images found for", gameId);
  }
  // action images
  fs.ensureDirSync(targetDir);
  const actionSource = path.join(
    __dirname,
    `../../../graphics/dist/actionShots/${gameId}`
  );
  if (fs.existsSync(actionSource)) {
    for (const pic of fs.readdirSync(actionSource)) {
      if (pic !== ".DS_Store") {
        fs.copySync(path.join(actionSource, pic), path.join(targetDir, pic));
      }
    }
  }
};
