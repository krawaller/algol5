import { FullDefAnon } from "../";

export type TestSuite<T> = {
  title: string;
  func: {
    (def: FullDefAnon, player: 1 | 2, action: string, input: T): string;
    funcName?: string;
  };
  defs: ParserTest<T>[];
};

export type ParserTest<T> = {
  def: FullDefAnon;
  player: 1 | 2;
  action: string;
  contexts: ContextTest<T>[];
};

export type ContextTest<T> = {
  context: { [idx: string]: any };
  tests: ExpressionTest<T>[];
};

export type ExpressionTest<T> = {
  expr: T;
  sample?: string;
  res: any;
  debug?: boolean;
  desc?: string;
};
