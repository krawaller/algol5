import { StartTurn } from "./startTurn";
import { EndGameDef } from "./endGame";
import { MarkDef } from "./mark";
import { CommandDef } from "./command";
export type StartTurn = StartTurn;
export type EndGameDef = EndGameDef;
export type MarkDef = MarkDef;
export type CommandDef = CommandDef;

export type Flow<
  ArtifactLayer extends string = string,
  Command extends string = string,
  Generator extends string = string,
  Layer extends string = string,
  Mark extends string = string,
  Unit extends string = string
> = {
  flow?: any;
  TODO?: string;
  STATUS?: string;
  startTurn?: StartTurn;
  canalwaysend?: {
    [name: string]: true;
  };
  endGame?: {
    [endgamename: string]: EndGameDef;
  };
  endTurn?: {
    unless: any;
  };
  commands: { [cmndname in Command]: CommandDef };
  marks: { [markname in Mark]: MarkDef };
};
