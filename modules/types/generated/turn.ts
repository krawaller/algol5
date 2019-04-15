import { AlgolStep } from "./";

type StepId = string;

export type AlgolTurn = {
  steps: { [stepId: string]: AlgolStep };
  canEnd?: boolean;
  gameOver?: boolean;
  viableStepIds: { [stepId: string]: true };
  gameEnds: {
    win: StepId[];
    lose: StepId[];
    draw: StepId[];
  };
  nextTurns: { [stepId: string]: AlgolTurn };
};

// TODO - move this to session! :D
