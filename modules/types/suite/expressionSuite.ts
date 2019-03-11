import { FullDefAnon } from "..";

export type AlgolExpressionSuite<T = any, U = any> = {
  title: string;
  func: {
    (def: FullDefAnon, player: 1 | 2, action: string, input?: T): string;
    funcName?: string;
  };
  defs: ExpressionParserTest<T, U>[];
};

export type ExpressionParserTest<T, U> = {
  def: FullDefAnon;
  player: 1 | 2;
  action: string;
  contexts: ExpressionContextTest<T, U>[];
};

export type ExpressionContextTest<T, U> = {
  context: { [idx: string]: any };
  tests: ExpressionTest<T, U>[];
};

export type ExpressionTest<T, U> = {
  expr: T;
  res: U;
  debug?: boolean;
  desc?: string;
};
