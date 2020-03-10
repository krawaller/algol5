import { AlgolGame, AlgolTurn, AlgolSetupAnon } from "../../../../types";
import { newTurnFromRootStep, hydrateTurn } from "./helpers";

/*
The beginning of a new battle!
*/
export function firstTurn(
  game: AlgolGame,
  setup: AlgolSetupAnon,
  ruleset: string
): AlgolTurn {
  const rootStep = game.newBattle(setup, ruleset);
  const firstTurn = newTurnFromRootStep(rootStep);
  const hydratedTurn = hydrateTurn(game, firstTurn);
  return hydratedTurn;
}
