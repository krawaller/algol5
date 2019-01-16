import { StartTurn } from "./startTurn";
import { EndGameDef } from "./endGame";
import { MarkDef } from "./mark";
import { CommandDef } from "./command";
export type StartTurn = StartTurn;
export * from "./endGame";
export * from "./startTurn";
export * from "./mark";
export * from "./command";

export type MarkDef = MarkDef;
export type CommandDef = CommandDef;

export type Flow<
  Btlp extends string = string,
  Btlv extends string = string,
  Cmnd extends string = string,
  Layer extends string = string,
  Mrk extends string = string,
  Turnp extends string = string,
  Turnv extends string = string
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
  commands: { [cmndname in Cmnd]: CommandDef };
  marks: { [markname in Mrk]: MarkDef };
};
