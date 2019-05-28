import { AlgolGame, AlgolTurn } from "algol-types";

/*
Used in hydrateStepInTurn
Will loop through all steps (adding them if needed)
and set turn.canEnd to true if applicable
*/
export function tryToReachTurnEnd(game: AlgolGame, turn: AlgolTurn): AlgolTurn {
  const turnSteps = turn.steps;
  const stepIdsToCheck = ["root"];
  while (!turn.canEnd && stepIdsToCheck.length) {
    const stepId = stepIdsToCheck.shift() as string;
    const step = turnSteps[stepId];
    const links = step.LINKS;
    if (links.endTurn || links.endGame || step.canAlwaysEnd) {
      turn.canEnd = true;
    } else {
      const actionsToCheck = Object.keys(links.marks).concat(
        Object.keys(links.commands)
      );
      while (!turn.canEnd && actionsToCheck.length) {
        const action = actionsToCheck.shift() as string;
        const func = links.marks[action] || links.commands[action];
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
