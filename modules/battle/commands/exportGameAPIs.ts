import { exportGameAPI } from "./helpers/exportGameAPI";
import names, { GameId } from "./helpers/_names";

const gameId = <GameId>process.argv[2];

if (!gameId) {
  console.log("---- Exporting API for all games ----");
  Promise.all(names.map(exportGameAPI)).then(() =>
    console.log("---- All games got APIs! ----")
  );
} else if (names.indexOf(gameId) === -1) {
  console.log(`Game "${gameId}" doesn't exists!`);
} else {
  exportGameAPI(gameId).catch(e => console.log("API export failed", e));
}
