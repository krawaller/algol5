import { AlgolGame, AlgolTurn } from "../../../types";
import { newTurnFromRootStep } from "./newTurnFromRootStep";
import { hydrateTurn } from "./hydrateTurn";

export function endTurn(game: AlgolGame, turn: AlgolTurn) {
  const currentStep = turn.steps[turn.currentStepId];
  if (currentStep.LINKS.endGame) {
    return {
      ...turn,
      gameOver: true
    };
  }
  if (turn.nextTurns[turn.currentStepId]) {
    return hydrateTurn(game, turn.nextTurns[turn.currentStepId]);
  }
  const newTurnStep = game.action[currentStep.LINKS.endTurn](currentStep);
  return hydrateTurn(game, newTurnFromRootStep(newTurnStep));
}
