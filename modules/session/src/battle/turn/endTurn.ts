import { AlgolGame, AlgolTurn } from "../../../../types";
import { newTurnFromRootStep, hydrateTurn } from "./helpers/.";

/*
Next players turn from the given stepId
*/
export function endTurn(game: AlgolGame, turn: AlgolTurn, fromStepId: string) {
  const fromStep = turn.steps[fromStepId];
  if (turn.nextTurns[fromStepId]) {
    return hydrateTurn(game, turn.nextTurns[fromStepId]);
  }
  const newTurnStep = game.action[fromStep.LINKS.endTurn](fromStep);
  return hydrateTurn(game, newTurnFromRootStep(newTurnStep));
}
