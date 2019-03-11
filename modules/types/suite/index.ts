export * from "./expressionSuite";
export * from "./statementSuite";

import { AlgolExpressionSuite, AlgolStatementSuite, ExpressionTest } from "../";

export type AlgolSuite = AlgolExpressionSuite | AlgolStatementSuite;

function isAlgolExpressionSuite(
  suite: AlgolSuite
): suite is AlgolExpressionSuite {
  return (
    (suite.defs[0].contexts[0].tests[0] as ExpressionTest<any, any>).res !==
    undefined
  );
}
