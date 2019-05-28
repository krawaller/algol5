import { AlgolTurn, AlgolGame } from "algol-types";
import { hydrateStepInTurn } from "../helpers";

/*
Used in .endTurn and .newBattleTurn
Prunes all links that don't lead to a possible turn/game end,
and follows all other links
*/
export function hydrateTurn(game: AlgolGame, turn: AlgolTurn): AlgolTurn {
  return hydrateStepInTurn(game, turn, "root");
}
