import { AlgolBool } from "./bool";
import { AlgolVal } from "./value";

export type Logical<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> =
  | _T
  | IfElse<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;

export interface IfElse<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  ifelse: [
    AlgolBool<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    Logical<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    Logical<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  ];
}

export interface If<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  if: [
    AlgolBool<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    Logical<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  ];
}

export interface IfPlayer<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  ifplayer: [
    AlgolVal<1 | 2, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    Logical<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  ];
}

export interface PlayerCase<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  playercase: [
    Logical<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    Logical<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  ];
}

export interface IfActionElse<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  ifactionelse: [
    AlgolVal<"start" | Mrk | Cmnd, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    Logical<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    Logical<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  ];
}
