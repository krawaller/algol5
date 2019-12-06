export * from "./instr.anon";
export * from "./instr.interfaces";
export * from "./instr.guard";

import {
  AlgolInstrLine,
  AlgolInstrUnitAt,
  AlgolInstrOrList,
  AlgolInstrAndList,
  AlgolInstrPluralize,
  AlgolInstrPos,
  AlgolInstrVal,
  AlgolInstrUnitType,
  AlgolInstrText,
  AlgolInstrPosList,
  AlgolInstrUnitList,
  AlgolInstrUnitTypeSet,
  AlgolInstrUnitTypePos,
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
  | ["otherplayer"]
  | AlgolInstrVal<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolInstrPluralize<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolInstrPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolInstrUnitAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolInstrLine<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolInstrOrList<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolInstrAndList<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolInstrUnitType<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolInstrPosList<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolInstrUnitList<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolInstrUnitTypeSet<
      Btlp,
      Btlv,
      Cmnd,
      Grid,
      Layer,
      Mrk,
      Turnp,
      Turnv,
      Unit
    >
  | AlgolInstrUnitTypePos<
      Btlp,
      Btlv,
      Cmnd,
      Grid,
      Layer,
      Mrk,
      Turnp,
      Turnv,
      Unit
    >
  | AlgolInstrText;
