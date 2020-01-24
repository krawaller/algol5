import retemplate from "./helpers/retemplate";
import fs from "fs-extra";
import path from "path";

import lib from "../dist/lib";

const gameId = process.argv[2];

if (!gameId) {
  console.log("---- Retemplating all games ----");
  for (const gameId in lib) {
    retemplate(gameId);
  }
  console.log("---- All games are now retemplated ----");
} else if (!fs.existsSync(path.join(__dirname, "../definitions", gameId))) {
  console.log(`Game "${gameId}" doesn't exists!`);
} else {
  retemplate(gameId);
}
