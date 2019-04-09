import { AlgolStep, AlgolContentAnon } from "../";

export type AlgolGame = {
  newBattle: () => AlgolStep;
  action: {
    [funcName: string]: (step: AlgolStep, action?: string) => AlgolStep;
  };
  instruction: {
    [funcName: string]: (step: AlgolStep) => AlgolContentAnon;
  };
};
