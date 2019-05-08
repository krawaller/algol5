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
  AlgolStatementIfAction
} from "./statement.interfaces";

export type AlgolStatement<
  _T,
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> =
  | _T
  | AlgolStatementIfElse<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolStatementPlayerCase<
      _T,
      Btlp,
      Btlv,
      Cmnd,
      Grid,
      Layer,
      Mrk,
      Turnp,
      Turnv
    >
  | AlgolStatementIfActionElse<
      _T,
      Btlp,
      Btlv,
      Cmnd,
      Grid,
      Layer,
      Mrk,
      Turnp,
      Turnv
    >
  | AlgolStatementIf<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolStatementIfAction<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolStatementIfPlayer<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolStatementForIdIn<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolStatementForPosIn<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolStatementMulti<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
