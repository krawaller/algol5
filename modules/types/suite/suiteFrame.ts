import { FullDefAnon } from "../";

export type AlgolSuiteFrame<Input, Test> = {
  title: string;
  func: {
    (def: FullDefAnon, player: 1 | 2, action: string, input: Input): string;
    funcName?: string;
  };
  defs: {
    def: FullDefAnon;
    player: 1 | 2;
    action: string;
    skip?: boolean;
    contexts: {
      skip?: boolean;
      context: { [idx: string]: any };
      tests: Test[];
    }[];
  }[];
};
