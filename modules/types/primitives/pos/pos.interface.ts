import { AlgolVal } from "../value";
import { AlgolSet } from "../set";
import { AlgolPos } from ".";

export interface AlgolPosMark<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> {
  mark: AlgolVal<Mrk, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

export interface AlgolPosBattlePos<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> {
  battlepos: AlgolVal<Btlp, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

export interface AlgolPosTurnPos<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> {
  turnpos: AlgolVal<Turnp, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

export interface AlgolPosOnlyIn<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> {
  onlyin: AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

export interface AlgolPosOffset<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> {
  offset: [
    // pos
    AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    // dir
    AlgolVal<
      1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
      Btlp,
      Btlv,
      Cmnd,
      Grid,
      Layer,
      Mrk,
      Turnp,
      Turnv
    >,
    // steps forward
    AlgolVal<number, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    // steps right
    AlgolVal<number, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  ];
}
