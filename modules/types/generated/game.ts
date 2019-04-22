import { AlgolStep, AlgolContentAnon } from "../";

export type AlgolGame = {
  gameId: string;
  newBattle: () => AlgolStep;
  action: {
    [funcName: string]: (
      step: Partial<AlgolStep>,
      action?: string
    ) => AlgolStep;
  };
  instruction: {
    [funcName: string]: (step: AlgolStep) => AlgolContentAnon;
  };
};
