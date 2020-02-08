const path = require("path");
const fs = require("fs-extra");
const list = require("../../games/dist/gameList");

console.log("---------- importing all game content images ---------- ");
for (const gameId of list) {
  const source = path.join(
    __dirname,
    `../../content/material/games/${gameId}/pics`
  );
  if (fs.existsSync(source)) {
    const target = path.join(__dirname, `../public/images/${gameId}`);
    fs.removeSync(target);
    fs.copySync(source, target);
    console.log("images imported for", gameId);
  } else {
    console.log("No images found for", gameId);
  }
}
console.log("------- all game content images imported---------- ");
