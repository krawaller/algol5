import { AlgolBool } from "./bool";
import { AlgolPos } from "./pos";
import { AlgolSet } from "./set";
import { AlgolVal } from "./value";

export type PosPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> = [
  AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
  AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
];

export type SetPosVal<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> = [
  AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
  AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
  AlgolVal<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
];

export type SetSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> = [
  AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
  AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
];

export type SetVal<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> = [
  AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
  AlgolVal<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
];

export type SetPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> = [
  AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
  AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
];

export type ValVal<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> = [
  AlgolVal<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
  AlgolVal<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
];

export type ValPos<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> = [
  AlgolVal<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
  AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
];

export type PosVal<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> = [
  AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
  AlgolVal<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
];
