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

export type FullDef<
  AiArtifactLayer extends string = string,
  AiAspect extends string = string,
  AiBrain extends string = string,
  AiGenerator extends string = string,
  AiGrid extends string = string,
  AiTerrain extends string = string,
  AiTerrainLayer extends string = string,
  ArtifactLayer extends string = string,
  BattlePos extends string = string,
  BattleVar extends string = string,
  Command extends string = string,
  Generator extends string = string,
  Layer extends string = string,
  Mark extends string = string,
  Phase extends string = string,
  Terrain extends string = string,
  TurnPos extends string = string,
  TurnVar extends string = string,
  Unit extends string = string
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
    Layer,
    Mark,
    TurnPos,
    TurnVar
  >;
  board: Board<Terrain>;
  setup: Setup<Unit>;
  graphics: Graphics<Terrain, Unit>;
  instructions: Instructions<
    BattlePos,
    BattleVar,
    Command,
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
