export * from "./expression.anon";
export * from "./expression.guard";
export * from "./expression.interfaces";

import {
  AlgolExpressionIfActionElse,
  AlgolExpressionIfElse,
  AlgolExpressionIndexList,
  AlgolExpressionPlayerCase,
} from "./expression.interfaces";

export type AlgolExpression<
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
  | AlgolExpressionIfElse<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolExpressionPlayerCase<
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
  | AlgolExpressionIfActionElse<
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
  | AlgolExpressionIndexList<
      _T,
      Btlp,
      Btlv,
      Cmnd,
      Grid,
      Layer,
      Mrk,
      Turnp,
      Turnv
    >;
