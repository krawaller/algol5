import { AlgolGame, AlgolTurn } from "../../../types";
import { newTurnFromRootStep } from "./newTurnFromRootStep";
import { hydrateTurn } from "./hydrateTurn";

export function newBattleTurn(game: AlgolGame): AlgolTurn {
  const rootStep = game.newBattle();
  const firstTurn = newTurnFromRootStep(rootStep);
  const hydratedTurn = hydrateTurn(game, firstTurn);
  return hydratedTurn;
}
