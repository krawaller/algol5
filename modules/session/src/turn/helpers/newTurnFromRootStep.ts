import { AlgolTurn, AlgolStep } from "../../../../types";

/*
Used in endTurn, hydrateStepInTurn and newBattleTurn

Simply takes a step and wraps it in a new turn
*/
export function newTurnFromRootStep(rootStep: AlgolStep): AlgolTurn {
  return {
    steps: { root: rootStep },
    nextTurns: {},
    viableStepIds: {},
    gameEnds: { win: [], lose: [], draw: [] }
  };
}
