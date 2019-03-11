import { FullDefAnon } from "..";

export type AlgolStatementSuite<T = any> = {
  title: string;
  func: {
    (def: FullDefAnon, player: 1 | 2, action: string, input?: T): string;
    funcName?: string;
  };
  defs: StatementParserTest<T>[];
};

export type StatementParserTest<T> = {
  def: FullDefAnon;
  player: 1 | 2;
  action: string;
  contexts: StatementContextTest<T>[];
};

export type StatementContextTest<T> = {
  context: { [idx: string]: any };
  tests: StatementTest<T>[];
};

export type StatementTest<T> = {
  expr: T;
  asserts: StatementAssertion<T>[];
  desc?: string;
};

export type StatementAssertion<T> = {
  sample: string;
  res: any;
  debug?: boolean;
  desc?: string;
};
