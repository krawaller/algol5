import { makeGameGraphics } from "./helpers";
import list, { GameId } from "../../games/dist/list";

const gameId = (process.argv[2] as unknown) as GameId;

(async () => {
  if (!gameId) {
    console.log("---- Generating SVG board for all games ----");
    await Promise.all(list.map(gameId => makeGameGraphics(gameId)));
    console.log("---- All games got SVG board ----");
  } else if (list.indexOf(gameId) === -1) {
    console.log(`Game "${gameId}" doesn't exists!`);
  } else {
    makeGameGraphics(gameId);
  }
})();
