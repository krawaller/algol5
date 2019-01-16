import * as fs from "fs-extra";
import * as path from "path";

import analyze from "./helpers/analyze";
import list from "./helpers/list";

const gameId = process.argv[2];

if (!gameId) {
  console.log("---- Analyzing all games ----");
  list().then(async l => {
    await Promise.all(l.map(analyze));
    console.log("---- All games analyzed ----");
  });
} else if (!fs.existsSync(path.join(__dirname, "../definitions", gameId))) {
  console.log(`Game "${gameId}" doesn't exists!`);
} else {
  analyze(gameId).then(() => {
    console.log(`Analysis for ${gameId} updated`);
  });
}
