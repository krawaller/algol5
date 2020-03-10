import { FullDefAnon } from "../";

export type AlgolSuiteFrame<Input, Test> = {
  title: string;
  func: {
    (
      def: FullDefAnon,
      player: 1 | 2,
      action: string,
      ruleset: string,
      input: Input
    ): string;
    funcName?: string;
  };
  defs: {
    def: FullDefAnon;
    player?: 1 | 2;
    ruleset?: string;
    action?: string;
    skip?: boolean;
    contexts: {
      skip?: boolean;
      envelope?: string;
      context: { [idx: string]: any };
      player?: 1 | 2;
      ruleset?: string;
      action?: string;
      tests: Test[];
    }[];
  }[];
};
