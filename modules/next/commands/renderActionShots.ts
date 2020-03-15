import list from "../../games/dist/gameList";
import renderActionShots from "./helpers/renderActionShots";

const gameId = process.argv[2];

(async () => {
  if (!gameId) {
    console.log("---------- rendering all games action shots ---------- ");
    for (const gameId of list) {
      await renderActionShots(gameId);
    }
    console.log("------- all game action shots rendered---------- ");
  } else {
    renderActionShots(gameId);
  }
})();
