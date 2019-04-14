import { AlgolStep, AlgolGame } from "../../../types";

type StepId = string;

type AlgolTurn = {
  steps: { [stepId: string]: AlgolStep };
  canEnd?: boolean;
  viableStepIds: { [stepId: string]: true };
  gameEnds: {
    win: StepId[];
    lose: StepId[];
    draw: StepId[];
  };
  currentStepId: StepId;
  currentPath: string[];
  nextTurns: { [stepId: string]: AlgolTurn };
};

export function makeFirstTurn(game: AlgolGame): AlgolTurn {
  const rootStep = game.newBattle();
  const firstTurn = newTurnFromRootStep(rootStep);
  const hydratedTurn = hydrateTurn(game, firstTurn);
  return hydratedTurn;
}

export function newTurnFromRootStep(rootStep: AlgolStep): AlgolTurn {
  return {
    steps: { root: rootStep },
    nextTurns: {},
    viableStepIds: {},
    gameEnds: { win: [], lose: [], draw: [] },
    currentStepId: "root",
    currentPath: []
  };
}

// just needs to hydrate the root step
export function hydrateTurn(game: AlgolGame, turn: AlgolTurn): AlgolTurn {
  return hydrateStepInTurn(game, turn, "root");
}

export function tryToReachTurnEnd(game: AlgolGame, turn: AlgolTurn): AlgolTurn {
  const turnSteps = turn.steps;
  const stepIdsToCheck = ["root"];
  while (!turn.canEnd && stepIdsToCheck.length) {
    const stepId = stepIdsToCheck.shift();
    const step = turnSteps[stepId];
    const links = step.LINKS;
    if (links.endTurn || links.endGame) {
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

// remove dead links in the step!
function hydrateStepInTurn(
  game: AlgolGame,
  turn: AlgolTurn,
  stepId: string
): AlgolTurn {
  const step = turn.steps[stepId];
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
    turn = hydrateStepInTurn(game, turn, nextStepId);
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
