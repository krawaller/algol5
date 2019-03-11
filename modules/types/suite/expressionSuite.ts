import { AlgolSuite, AlgolSuiteFrame } from "../";

export type AlgolExpressionTest<Input = any, Output = any> = {
  expr: Input;
  res: Output;
  debug?: boolean;
  desc?: string;
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
