import { makeGamePages } from "./helpers/makeGamePages";
import { list, GameId } from "../../games/dist/list";

const gameId = process.argv[2];

if (!gameId) {
  console.log("---- Making pages for all games ----");
  for (const gameId of list) {
    makeGamePages(gameId);
  }
  console.log("---- All games got pages ----");
} else if (!list.includes(gameId as GameId)) {
  console.log(`Game "${gameId}" doesn't exists!`);
} else {
  makeGamePages(gameId);
}
