import { AlgolGame, AlgolTurn } from "../../../types";

export function makeTurnAction(
  game: AlgolGame,
  turn: AlgolTurn,
  action: string
) {
  const { steps, currentStepId } = turn;
  const currentStep = steps[currentStepId];
  const newStepId = currentStepId + "-" + action;
  if (!steps[newStepId]) {
    const func = currentStep.LINKS.actions[action];
    steps[newStepId] = game.action[func](currentStep, action);
  }
  turn.currentStepId = newStepId;
  return turn;
}
