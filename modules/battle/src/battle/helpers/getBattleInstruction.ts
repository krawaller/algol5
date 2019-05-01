import { AlgolGame, AlgolBattle } from "../../../../types";

// TODO - special if battle is over?

export function getBattleInstruction(game: AlgolGame, battle: AlgolBattle) {
  const { currentStepId } = battle.state;
  const currentStep = battle.turn.steps[currentStepId];
  if (currentStepId === "root") {
    return game.instruction["startTurn" + battle.player](currentStep);
  }
  const actions = currentStepId.split("-");
  const lastAction = actions.slice(-1).pop() as string;
  const prevStepId = actions.slice(0, -1).join("-");
  const prevStep = battle.turn.steps[prevStepId];
  const actionFunc = prevStep.LINKS.actions[lastAction];
  return game.instruction[actionFunc](currentStep);
}
