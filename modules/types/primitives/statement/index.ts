export * from "./statement.anon";
export * from "./statement.guard";

import {
  AlgolStatementForIdIn,
  AlgolStatementForPosIn,
  AlgolStatementMulti,
  AlgolStatementIfActionElse,
  AlgolStatementIfElse,
  AlgolStatementPlayerCase,
  AlgolStatementIf,
  AlgolStatementIfPlayer,
  AlgolStatementIfAction,
  AlgolStatementIfRuleset,
} from "./statement.interfaces";
import { AlgolGameBlobAnon } from "../../blob";

export type AlgolStatement<Blob extends AlgolGameBlobAnon, _T> =
  | _T
  | AlgolStatementIfElse<Blob, _T>
  | AlgolStatementPlayerCase<Blob, _T>
  | AlgolStatementIfActionElse<Blob, _T>
  | AlgolStatementIf<Blob, _T>
  | AlgolStatementIfAction<Blob, _T>
  | AlgolStatementIfPlayer<Blob, _T>
  | AlgolStatementForIdIn<Blob, _T>
  | AlgolStatementForPosIn<Blob, _T>
  | AlgolStatementMulti<Blob, _T>
  | AlgolStatementIfRuleset<Blob, _T>;
