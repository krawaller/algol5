import { AlgolBool } from "./bool";
import { AlgolVal } from "./value";

export type AlgolLogical<
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
  | AlgolLogicalIfElse<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolLogicalIf<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolLogicalIfPlayer<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolLogicalPlayerCase<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolLogicalIfActionElse<
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
  | AlgolLogicalIndexList<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;

export interface AlgolLogicalIfElse<
  _T,
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> {
  ifelse: [
    AlgolBool<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolLogical<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolLogical<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  ];
}

export interface AlgolLogicalIf<
  _T,
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> {
  if: [
    AlgolBool<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolLogical<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  ];
}

export interface AlgolLogicalIfPlayer<
  _T,
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> {
  ifplayer: [
    AlgolVal<1 | 2, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolLogical<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  ];
}

export interface AlgolLogicalPlayerCase<
  _T,
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> {
  playercase: [
    AlgolLogical<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolLogical<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  ];
}

export interface AlgolLogicalIfActionElse<
  _T,
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> {
  ifactionelse: [
    AlgolVal<
      "start" | Mrk | Cmnd,
      Btlp,
      Btlv,
      Cmnd,
      Grid,
      Layer,
      Mrk,
      Turnp,
      Turnv
    >,
    AlgolLogical<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolLogical<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  ];
}

export interface AlgolLogicalIndexList<
  _T,
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> {
  indexlist: [
    AlgolVal<string | number, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    ...AlgolLogical<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>[]
  ];
}

// --------------------

export type AlgolLogicalAnon = AlgolLogical<
  string | number,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;

export type AlgolLogicalIfElseAnon = AlgolLogicalIfElse<
  string | number,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;

export type AlgolLogicalIfAnon = AlgolLogicalIf<
  string | number,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;

export type AlgolLogicalPlayerCaseAnon = AlgolLogicalPlayerCase<
  string | number,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;

export type AlgolLogicalIfPlayerAnon = AlgolLogicalIfPlayer<
  string | number,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;

export type AlgolLogicalIfActionElseAnon = AlgolLogicalIfActionElse<
  string | number,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;

export type AlgolLogicalIndexListAnon = AlgolLogicalIndexList<
  string | number,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
