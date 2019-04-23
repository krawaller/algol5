import { makeDemo } from "./helpers/makeDemo";
import names, { GameId } from "./helpers/_names";

const gameId = <GameId>process.argv[2];

if (!gameId) {
  console.log("---- Making demo for all games ----");
  Promise.all(names.map(makeDemo)).then(() =>
    console.log("---- All games got demos! ----")
  );
} else if (names.indexOf(gameId) === -1) {
  console.log(`Game "${gameId}" doesn't exists!`);
} else {
  makeDemo(gameId).catch(e => console.log("Compilation failed", e));
}
