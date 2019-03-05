import { FullDefAnon } from "../";

export type AlgolWriterSuite<T = any, U = any> = {
  title: string;
  func: {
    (def: FullDefAnon, player: 1 | 2, action: string, input?: T): string;
    funcName?: string;
  };
  defs: ParserTest<T, U>[];
};

export type ParserTest<T, U> = {
  def: FullDefAnon;
  player: 1 | 2;
  action: string;
  contexts: ContextTest<T, U>[];
};

export type ContextTest<T, U> = {
  context: { [idx: string]: any };
  tests: ExpressionTest<T, U>[];
};

export type ExpressionTest<T, U> = {
  expr?: T;
  sample?: string;
  res: U;
  debug?: boolean;
  desc?: string;
};
