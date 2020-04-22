import { renderGameActionShots } from "./helpers";
import list, { GameId } from "../../games/dist/list";

const gameId = (process.argv[2] as unknown) as GameId;

(async () => {
  if (!gameId) {
    console.log("---- Rendering action shots for all games ----");
    await Promise.all(list.map(gameId => renderGameActionShots(gameId)));
    console.log("---- All games got action shots ----");
  } else if (list.indexOf(gameId) === -1) {
    console.log(`Game "${gameId}" doesn't exists!`);
  } else {
    await renderGameActionShots(gameId);
  }
})();
