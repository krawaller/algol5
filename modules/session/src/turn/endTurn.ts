import { AlgolGame, AlgolTurn } from "../../../types";
import { newTurnFromRootStep, hydrateTurn } from "./helpers/.";

/*
Execute an endTurn "command" for the turn.
Will either end the game, or switch over to the next player
*/
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
