import * as fs from "fs-extra";
import * as path from "path";

import stub from "./helpers/stub";

const gameId = process.argv[2];

if (!gameId) {
  console.log("No gameId provided! Usage: npm run stub mynewgameid");
} else if (!gameId.match(/^[A-Za-z]+$/)) {
  console.log(
    `New gameId should only consist of letters, "${gameId}" doesn't qualify!`
  );
} else if (fs.existsSync(path.join(__dirname, "../definitions", gameId))) {
  console.log(`Game "${gameId}" already exists!`);
} else {
  stub(gameId).then(() => {
    console.log(
      "Stub created for ",
      gameId,
      ", dont forget to update exports too!"
    );
  });
}
