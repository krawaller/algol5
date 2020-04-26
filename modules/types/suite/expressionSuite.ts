import { AlgolSuite, AlgolSuiteFrame } from "../";

export type AlgolExpressionTest<Input = any, Output = any> = {
  expr: Input;
  res: Output;
  debug?: boolean;
  naked?: boolean;
  desc?: string;
  skip?: boolean;
  player?: 1 | 2;
  action?: string;
  ruleset?: string;
};

export type AlgolExpressionSuite<I = any, O = any> = AlgolSuiteFrame<
  I,
  AlgolExpressionTest<I, O>
>;

export function isAlgolExpressionSuite(
  suite: AlgolSuite
): suite is AlgolExpressionSuite {
  return (
    (suite.defs[0].contexts[0].tests[0] as AlgolExpressionTest).res !==
    undefined
  );
}

export function isAlgolExpressionTest(tst: any): tst is AlgolExpressionTest {
  return (tst as AlgolExpressionTest).res !== undefined;
}
