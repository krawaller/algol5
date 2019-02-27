export * from "./instr.anon";
export * from "./instr.interfaces";
export * from "./instr.guard";

import {
  AlgolInstrLine,
  AlgolInstrNameAt,
  AlgolInstrOrList,
  AlgolInstrPluralize,
  AlgolInstrPos,
  AlgolInstrVal
} from "./instr.interfaces";

import { AlgolIfableExpression } from "../../";

export type AlgolInstr<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv,
  Unit
> = AlgolIfableExpression<
  AlgolInstrInner<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>,
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
>;

type AlgolInstrInner<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit> =
  | string
  | Cmnd
  | Unit
  | AlgolInstrVal<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolInstrPluralize<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolInstrPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolInstrNameAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolInstrLine<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolInstrOrList<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>;
