import { makeSVGboard } from "./helpers";
import list from "../../games/dist/list";

const gameId = process.argv[2];

if (!gameId) {
  console.log("---- Generating SVG board for all games ----");
  Promise.all(list.map(makeSVGboard)).then(() => {
    console.log("---- All games got SVG board ----");
  });
} else if (list.indexOf(gameId) === -1) {
  console.log(`Game "${gameId}" doesn't exists!`);
} else {
  makeSVGboard(gameId);
}
