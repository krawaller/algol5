import { AlgolTurn, AlgolGame } from "../../../../../types";
import { tryToReachTurnEnd, newTurnFromRootStep } from "../helpers";

// removes dead links in this step
export function hydrateStepInTurn(
  game: AlgolGame,
  turn: AlgolTurn,
  stepId: string,
  full?: boolean
): AlgolTurn {
  const step = turn.steps[stepId];
  if (step.massiveTree) {
    turn.viableStepIds[stepId] = true;
    return turn; // TODO - mark somehow? also check .canAlwaysEnd?
  }
  if (step.canAlwaysEnd && !full) {
    turn.canEnd = true;
    turn.viableStepIds[stepId] = true;
    return turn;
  }
  const stepLinks = step.LINKS;
  if (stepLinks.endGame) {
    turn.canEnd = true;
    turn.gameEnds[stepLinks.endGame].push(stepId);
    turn.viableStepIds[stepId] = true;
  }
  if (stepLinks.endTurn) {
    const newTurn = tryToReachTurnEnd(
      game,
      newTurnFromRootStep(game.action[stepLinks.endTurn](step))
    );
    turn.canEnd = true;
    turn.viableStepIds[stepId] = true;
    if (newTurn.canEnd) {
      turn.nextTurns[stepId] = newTurn;
    } else {
      delete stepLinks.endTurn;
      stepLinks.endGame = "win";
      stepLinks.endedBy = "starvation";
      turn.gameEnds.win.push(stepId);
    }
  }
  const actionsToCheck = Object.keys(stepLinks.actions);
  while (actionsToCheck.length) {
    const action = actionsToCheck.shift();
    const nextStepId = stepId + "-" + action;
    if (!turn.steps[nextStepId]) {
      const func = stepLinks.actions[action];
      turn.steps[nextStepId] = game.action[func](step, action);
    }
    turn = hydrateStepInTurn(game, turn, nextStepId, full);
    if (turn.viableStepIds[nextStepId]) {
      turn.canEnd = true;
      turn.viableStepIds[stepId] = true;
    } else {
      delete stepLinks.actions[action];
      delete turn.steps[nextStepId];
    }
  }
  return turn;
}
