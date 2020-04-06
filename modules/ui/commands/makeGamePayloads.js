const list = require("../../games/dist/gameList");
const makeGamePayload = require("./helpers/makeGamePayload");

const gameId = process.argv[2];

if (!gameId) {
  console.log("---------- making payloads for all games ---------- ");
  for (const gameId of list) {
    makeGamePayload(gameId);
  }
  console.log("------- all games got payloads ---------- ");
} else {
  makeGamePayload(gameId);
}
