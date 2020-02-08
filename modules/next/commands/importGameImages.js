const list = require("../../games/dist/gameList");
const importGameImages = require("./helpers/importGameImages");

const gameId = process.argv[2];

if (!gameId) {
  console.log("---------- importing all game content images ---------- ");
  for (const gameId of list) {
    importGameImages(gameId);
  }
  console.log("------- all game content images imported---------- ");
} else {
  importGameImages(gameId);
}
