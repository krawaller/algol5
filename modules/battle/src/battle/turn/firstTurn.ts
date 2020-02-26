import { AlgolGame, AlgolTurn, AlgolSetupAnon } from "../../../../types";
import { newTurnFromRootStep, hydrateTurn } from "./helpers";

/*
The beginning of a new battle!
*/
export function firstTurn(game: AlgolGame, setup: AlgolSetupAnon): AlgolTurn {
  const rootStep = game.newBattle(setup);
  const firstTurn = newTurnFromRootStep(rootStep);
  const hydratedTurn = hydrateTurn(game, firstTurn);
  return hydratedTurn;
}
