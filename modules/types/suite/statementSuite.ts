import { AlgolSuite, AlgolSuiteFrame } from "..";

export type AlgolStatementTest<Input = any> = {
  expr: Input;
  desc?: string;
  asserts: {
    sample: string;
    res: any;
    debug?: boolean;
    desc?: string;
  }[];
};

export type AlgolStatementSuite<I = any> = AlgolSuiteFrame<
  I,
  AlgolStatementTest<I>
>;

export function isAlgolStatementSuite(
  suite: AlgolSuite
): suite is AlgolStatementSuite {
  return (
    (suite.defs[0].contexts[0].tests[0] as AlgolStatementTest).asserts !==
    undefined
  );
}
