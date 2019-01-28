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
import { Flow } from "./flow";
import { GameTestSuite } from "./scripts";

export type FullDefAnon = FullDef<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  number,
  number,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;

export type FullDef<
  AiArtifactLayer extends string,
  AiAspect extends string,
  AiBrain extends string,
  AiGenerator extends string,
  AiGrid extends string,
  AiTerrain extends string,
  AiTerrainLayer extends string,
  ArtifactLayer extends string,
  BattlePos extends string,
  BattleVar extends string,
  BoardHeight extends number,
  BoardWidth extends number,
  Command extends string,
  Generator extends string,
  Grid extends string,
  Layer extends string,
  Mark extends string,
  Phase extends string,
  Position extends string,
  Terrain extends string,
  TurnPos extends string,
  TurnVar extends string,
  Unit extends string
> = {
  AI: AI<
    AiArtifactLayer,
    AiAspect,
    AiBrain,
    AiGenerator,
    AiGrid,
    AiTerrain,
    AiTerrainLayer,
    BattlePos,
    BattleVar,
    Command,
    Grid,
    Layer,
    Mark,
    Position,
    TurnPos,
    TurnVar
  >;
  board: Board<BoardHeight, BoardWidth, Position, Terrain>;
  setup: Setup<Position, Unit>;
  graphics: Graphics<Terrain, Unit>;
  grids?: { [g in Grid]: any };
  instructions: Instructions<
    BattlePos,
    BattleVar,
    Command,
    Grid,
    Layer,
    Mark,
    Phase,
    TurnPos,
    TurnVar,
    Unit
  >;
  meta: Meta;
  flow: Flow<
    BattlePos,
    BattleVar,
    Command,
    Generator,
    Grid,
    Layer,
    Mark,
    TurnPos,
    TurnVar,
    Unit
  >;
  generators: Generators<
    ArtifactLayer,
    BattlePos,
    BattleVar,
    Command,
    Generator,
    Grid,
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
  board: any;
  setup?: any;
  startTurn?: any;
  canalwaysend?: {
    [name: string]: true;
  };
  endGame?: {
    [endgamename: string]: any;
  };
  endTurn?: {
    unless: any;
  };
  AI?: any;
  commands: {
    [cmndname: string]: any;
  };
  marks: {
    [markname: string]: any;
  };
  generators: {
    [genname: string]: any;
  };
};
