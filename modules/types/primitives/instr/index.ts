export * from "./instr.anon";
export * from "./instr.interfaces";
export * from "./instr.guard";

import {
  AlgolInstrLine,
  AlgolInstrUnitAt,
  AlgolInstrOrList,
  AlgolInstrPluralize,
  AlgolInstrPos,
  AlgolInstrVal,
  AlgolInstrUnitType,
  AlgolInstrText
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

export type AlgolInstrInner<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv,
  Unit
> =
  | string
  | number
  | Cmnd
  | Unit
  | ["defaultEndTurnInstruction"]
  | AlgolInstrVal<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolInstrPluralize<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolInstrPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolInstrUnitAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolInstrLine<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolInstrOrList<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolInstrUnitType<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolInstrText;
