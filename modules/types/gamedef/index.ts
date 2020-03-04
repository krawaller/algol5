export * from "./generators";
export * from "./ai";
export * from "./board";
export * from "./flow";
export * from "./scripts";
export * from "./instructions";
export * from "./meta";
export * from "./setup";
export * from "./graphics";
export * from "./performance";
export * from "./anim";

import { Generators } from "./generators";
import { Graphics } from "./graphics";
import { AlgolBoardBookAnon } from "./board";
import { AI } from "./ai";
import { AlgolSetupBook } from "./setup";
import { Instructions } from "./instructions";
import { AlgolMeta } from "./meta";
import { Flow } from "./flow";
import { AlgolGameTestSuite } from "./scripts";
import { AlgolPerformance } from "./performance";
import { AlgolAnimCollection } from "./anim";
import { AlgolVariantBook } from "./variants";

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
    BoardHeight,
    BoardWidth,
    Command,
    Grid,
    Layer,
    Mark,
    Position,
    TurnPos,
    TurnVar
  >;
  anim: AlgolAnimCollection<
    BattlePos,
    BattleVar,
    Command,
    Grid,
    Layer,
    Mark,
    TurnPos,
    TurnVar,
    Unit
  >;
  boards: AlgolBoardBookAnon;
  setups: AlgolSetupBook<Position, Unit>;
  variants: AlgolVariantBook<string, string, string>;
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
  meta: AlgolMeta<Command, Mark>;
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
  scripts: AlgolGameTestSuite<Command, Position>;
  performance: AlgolPerformance<Command, Mark>;
};

// TODO - ditch this, only used in legacy code
export type Definition = {
  flow?: any;
  TODO?: string;
  STATUS?: string;
  meta: any;
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
