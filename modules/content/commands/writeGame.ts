import fs from "fs-extra";
import path from "path";
import { GameId, list } from "../../games/dist/list";

import { writeGame } from "./helpers";

const gameId = process.argv[2] as GameId;

if (!gameId) {
  console.log("---- Writing all game contents ----");
  for (const gameId of list) {
    writeGame(gameId);
  }
  console.log("---- All game contents written ----");
} else if (!fs.existsSync(path.join(__dirname, "../material/games", gameId))) {
  console.log(`Game "${gameId}" has no content!`);
} else {
  writeGame(gameId);
}
