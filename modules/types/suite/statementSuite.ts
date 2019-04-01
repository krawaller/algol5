import { AlgolSuite, AlgolSuiteFrame } from "..";

export type AlgolStatementTest<Input = any> = {
  expr: Input;
  desc?: string;
  skip?: boolean;
  player?: 1 | 2;
  action?: string;
  asserts: {
    sample: string;
    res: any;
    debug?: boolean;
    desc?: string;
    skip?: boolean;
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

export function isAlgolStatementTest(tst: any): tst is AlgolStatementTest {
  return (tst as AlgolStatementTest).asserts !== undefined;
}
