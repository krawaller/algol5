import list from "../../games/dist/gameList";
import renderActionShots from "./helpers/renderActionShots";

const gameId = process.argv[2];

if (!gameId) {
  console.log("---------- rendering all games action shots ---------- ");
  for (const gameId of list) {
    renderActionShots(gameId);
  }
  console.log("------- all game action shots rendered---------- ");
} else {
  renderActionShots(gameId);
}
