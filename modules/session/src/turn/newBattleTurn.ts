import { AlgolGame, AlgolTurn } from "../../../types";
import { newTurnFromRootStep, hydrateTurn } from "./helpers";

/*
The beginning of a new battle!
*/
export function newBattleTurn(game: AlgolGame): AlgolTurn {
  const rootStep = game.newBattle();
  const firstTurn = newTurnFromRootStep(rootStep);
  const hydratedTurn = hydrateTurn(game, firstTurn);
  return hydratedTurn;
}
