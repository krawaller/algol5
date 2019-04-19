import { AlgolTurn, AlgolGame } from "../../../../../types";
import { hydrateStepInTurn } from "../helpers";

/*
Used in .endTurn and .newBattleTurn
Prunes all links that don't lead to a possible turn/game end
*/
export function hydrateTurn(game: AlgolGame, turn: AlgolTurn): AlgolTurn {
  return hydrateStepInTurn(game, turn, "root");
}
