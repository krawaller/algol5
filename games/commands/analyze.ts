import * as fs from "fs-extra";
import * as path from "path";

import analyze from "./helpers/analyze";

const gameId = process.argv[2];

if (!gameId) {
  console.log("No gameId provided! Usage: npm run analyse <gameId>");
} else if (!fs.existsSync(path.join(__dirname, "../definitions", gameId))) {
  console.log(`Game "${gameId}" doesn't exists!`);
} else {
  analyze(gameId).then(() => {
    console.log(`Analysis for ${gameId} updated`);
  });
}
