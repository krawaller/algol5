import { AlgolTurn, AlgolStep } from "../../../types";

export function newTurnFromRootStep(rootStep: AlgolStep): AlgolTurn {
  return {
    steps: { root: rootStep },
    nextTurns: {},
    viableStepIds: {},
    gameEnds: { win: [], lose: [], draw: [] },
    currentStepId: "root"
  };
}
