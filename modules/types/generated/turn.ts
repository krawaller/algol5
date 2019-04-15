import { AlgolStep } from "./";

type StepId = string;

export type AlgolTurn = {
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
