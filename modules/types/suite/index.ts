export * from "./expressionSuite";
export * from "./statementSuite";
export * from "./suiteFrame";

import { AlgolStatementSuite, AlgolExpressionSuite } from "../";

export type AlgolSuite = AlgolExpressionSuite | AlgolStatementSuite;
