import { StartTurn } from "./startTurn";
import { EndGameDef } from "./endGame";
import { MarkDef } from "./mark";
import { CommandDef } from "./command";

export * from "./endGame";
export * from "./startTurn";
export * from "./mark";
export * from "./command";

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
  startTurn?: StartTurn;
  canalwaysend?: {
    [name: string]: true;
  };
  endGame?: {
    [endgamename: string]: EndGameDef<
      Btlp,
      Btlv,
      Cmnd,
      Layer,
      Mrk,
      Turnp,
      Turnv
    >;
  };
  endTurn?: {
    unless: any;
  };
  commands: {
    [cmndname in Cmnd]: CommandDef<
      Btlp,
      Btlv,
      Cmnd,
      Gen,
      Layer,
      Mrk,
      Turnp,
      Turnv,
      Unit
    >
  };
  marks: {
    [markname in Mrk]: MarkDef<Btlp, Btlv, Cmnd, Gen, Layer, Mrk, Turnp, Turnv>
  };
};
