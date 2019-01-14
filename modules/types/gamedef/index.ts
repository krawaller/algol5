export * from "./generators";
export * from "./ai";
export * from "./board";
export * from "./flow";
export * from "./scripts";
export * from "./instructions";
export * from "./meta";
export * from "./setup";
export * from "./graphics";

import { Generators } from "./generators";
import { Graphics } from "./graphics";
import { Board } from "./board";
import { AI } from "./ai";
import { Setup } from "./setup";
import { Instructions } from "./instructions";
import { Meta } from "./meta";
import { Flow, StartTurn, EndGameDef, CommandDef, MarkDef } from "./flow";
import { GameTestSuite } from "./scripts";

export type FullDef<
  ArtifactLayer extends string,
  BattlePos extends string,
  BattleVar extends string,
  Command extends string,
  Generator extends string,
  Layer extends string,
  Mark extends string,
  Phase extends string,
  Terrain extends string,
  TurnPos extends string,
  TurnVar extends string,
  Unit extends string
> = {
  AI: AI;
  board: Board<Terrain>;
  setup: Setup<Unit>;
  graphics: Graphics<Terrain, Unit>;
  instructions: Instructions<Phase>;
  meta: Meta;
  flow: Flow<ArtifactLayer, Command, Generator, Layer, Mark, Unit>;
  generators: Generators<
    ArtifactLayer,
    BattlePos,
    BattleVar,
    Command,
    Generator,
    Layer,
    Mark,
    TurnPos,
    TurnVar
  >;
  scripts: GameTestSuite;
};

// TODO - ditch this, only used in legacy code
export type Definition = {
  flow?: any;
  TODO?: string;
  STATUS?: string;
  meta: Meta;
  graphics: Graphics;
  board: Board;
  setup?: Setup;
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
  AI?: AI;
  commands: {
    [cmndname: string]: CommandDef;
  };
  marks: {
    [markname: string]: MarkDef;
  };
  generators: {
    [genname: string]: any;
  };
};
