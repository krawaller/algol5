import * as fs from "fs-extra";
import * as path from "path";

import fake from "./helpers/fake";
import list from "./helpers/list";

const gameId = process.argv[2];

if (!gameId) {
  console.log("---- Faking all games ----");
  list().then(async l => {
    await Promise.all(l.map(fake));
    console.log("---- All games faked ----");
  });
} else if (!fs.existsSync(path.join(__dirname, "../definitions", gameId))) {
  console.log(`Game "${gameId}" doesn't exists!`);
} else {
  fake(gameId).then(() => {
    console.log(`Types for ${gameId} faked`);
  });
}
