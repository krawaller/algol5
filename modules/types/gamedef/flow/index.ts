import { AlgolStartTurnDef, AlgolCommandDef, AlgolMarkDef } from "./actions";
import { EndGameDef } from "./endGame";

export * from "./actions";

export type Flow<
  Btlp extends string,
  Btlv extends string,
  Cmnd extends string,
  Gen extends string,
  Grid extends string,
  Layer extends string,
  Mrk extends string,
  Turnp extends string,
  Turnv extends string,
  Unit extends string
> = {
  flow?: any;
  TODO?: string;
  STATUS?: string;
  startTurn?: AlgolStartTurnDef<
    Btlp,
    Btlv,
    Cmnd,
    Gen,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  >;
  canalwaysend?: {
    [name: string]: true;
  };
  endGame?: {
    [endgamename: string]: EndGameDef<
      Btlp,
      Btlv,
      Cmnd,
      Grid,
      Layer,
      Mrk,
      Turnp,
      Turnv
    >;
  };
  commands: {
    [cmndname in Cmnd]: AlgolCommandDef<
      Btlp,
      Btlv,
      Cmnd,
      Gen,
      Grid,
      Layer,
      Mrk,
      Turnp,
      Turnv,
      Unit
    >;
  };
  marks: {
    [markname in Mrk]: AlgolMarkDef<
      Btlp,
      Btlv,
      Cmnd,
      Gen,
      Grid,
      Layer,
      Mrk,
      Turnp,
      Turnv
    >;
  };
};
