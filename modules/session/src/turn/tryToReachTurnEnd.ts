import { AlgolGame, AlgolTurn } from "../../../types";

export function tryToReachTurnEnd(game: AlgolGame, turn: AlgolTurn): AlgolTurn {
  const turnSteps = turn.steps;
  const stepIdsToCheck = ["root"];
  while (!turn.canEnd && stepIdsToCheck.length) {
    const stepId = stepIdsToCheck.shift();
    const step = turnSteps[stepId];
    const links = step.LINKS;
    if (links.endTurn || links.endGame || step.canAlwaysEnd) {
      turn.canEnd = true;
    } else {
      const actionLinks = links.actions;
      const actionsToCheck = Object.keys(actionLinks);
      while (!turn.canEnd && actionsToCheck.length) {
        const action = actionsToCheck.shift();
        const func = actionLinks[action];
        const newStepId = stepId + "-" + action;
        if (!turnSteps[newStepId]) {
          turnSteps[newStepId] = game.action[func](step, action);
        }
        stepIdsToCheck.push(newStepId);
      }
    }
  }
  return turn;
}
