import { list, GameId } from "../../games/dist/list";
import { makeGameListing } from "./helpers/makeGameListing";

const gameId = process.argv[2] as GameId;

if (!gameId) {
  console.log("---------- making listings for all games ---------- ");
  for (const gameId of list) {
    makeGameListing(gameId);
  }
  console.log("------- all games got listings ---------- ");
} else {
  makeGameListing(gameId);
}
