import { GameId, list } from "../../games/dist/list";

import { stubGame } from "./helpers";

const gameId = process.argv[2] as GameId;

if (!gameId) {
  console.log("---- Stubbing all games ----");
  for (const gameId of list) {
    stubGame(gameId);
  }
  console.log("---- All games stubbed ----");
} else {
  stubGame(gameId);
}
