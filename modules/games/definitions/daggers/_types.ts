// Generated file, do not edit here!
import {
  CommonLayer,
  Generators,
  Flow,
  AlgolBoard,
  AI,
  AlgolAnimCollection,
  Graphics,
  Instructions,
  AlgolMeta,
  AlgolSetupBook,
  AlgolGameTestSuite,
  FullDef,
  AlgolPerformance
} from "../../../types";

export type DaggersBoardHeight = 8;
export type DaggersBoardWidth = 8;

export type DaggersAnim = AlgolAnimCollection<
  DaggersBattlePos,
  DaggersBattleVar,
  DaggersCommand,
  DaggersGrid,
  DaggersLayer,
  DaggersMark,
  DaggersTurnPos,
  DaggersTurnVar,
  DaggersUnit
>;

export type DaggersTerrain = "base";
export type DaggersUnit = "daggers" | "crowns";
export type DaggersMark = "selectunit" | "selectmovetarget";
export type DaggersCommand = "move";
export type DaggersPhaseCommand = never;
export type DaggersPhase = "startTurn" | DaggersMark;
export type DaggersUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "daggers"
  | "mydaggers"
  | "oppdaggers"
  | "neutraldaggers"
  | "crowns"
  | "mycrowns"
  | "oppcrowns"
  | "neutralcrowns";
export type DaggersGenerator = "findcrowntargets" | "finddaggertargets";
export type DaggersArtifactLayer = "movetarget";
export type DaggersTerrainLayer = "base" | "mybase" | "oppbase" | "nobase";
export type DaggersLayer =
  | CommonLayer
  | DaggersUnitLayer
  | DaggersArtifactLayer
  | DaggersTerrainLayer;
export type DaggersBattlePos = never;
export type DaggersBattleVar = never;
export type DaggersTurnPos = never;
export type DaggersTurnVar = never;

export type DaggersGenerators = Generators<
  DaggersArtifactLayer,
  DaggersBattlePos,
  DaggersBattleVar,
  DaggersCommand,
  DaggersGenerator,
  DaggersGrid,
  DaggersLayer,
  DaggersMark,
  DaggersTurnPos,
  DaggersTurnVar
>;
export type DaggersFlow = Flow<
  DaggersBattlePos,
  DaggersBattleVar,
  DaggersCommand,
  DaggersGenerator,
  DaggersGrid,
  DaggersLayer,
  DaggersMark,
  DaggersTurnPos,
  DaggersTurnVar,
  DaggersUnit
>;
export type DaggersBoard = AlgolBoard<
  DaggersBoardHeight,
  DaggersBoardWidth,
  DaggersGrid,
  DaggersPosition,
  DaggersTerrain
>;
export type DaggersAI = AI<
  DaggersAiArtifactLayer,
  DaggersAiAspect,
  DaggersAiBrain,
  DaggersAiGenerator,
  DaggersAiGrid,
  DaggersAiTerrain,
  DaggersAiTerrainLayer,
  DaggersBattlePos,
  DaggersBattleVar,
  DaggersBoardHeight,
  DaggersBoardWidth,
  DaggersCommand,
  DaggersGrid,
  DaggersLayer,
  DaggersMark,
  DaggersPosition,
  DaggersTurnPos,
  DaggersTurnVar
>;
export type DaggersGraphics = Graphics<DaggersTerrain, DaggersUnit>;
export type DaggersInstructions = Instructions<
  DaggersBattlePos,
  DaggersBattleVar,
  DaggersCommand,
  DaggersGrid,
  DaggersLayer,
  DaggersMark,
  DaggersPhase,
  DaggersTurnPos,
  DaggersTurnVar,
  DaggersUnit
>;
export type DaggersMeta = AlgolMeta<DaggersCommand, DaggersMark>;
export type DaggersPerformance = AlgolPerformance<DaggersCommand, DaggersMark>;
export type DaggersScripts = AlgolGameTestSuite<
  DaggersCommand,
  DaggersPosition
>;
export type DaggersSetupBook = AlgolSetupBook<DaggersPosition, DaggersUnit>;

export type DaggersDefinition = FullDef<
  DaggersAiArtifactLayer,
  DaggersAiAspect,
  DaggersAiBrain,
  DaggersAiGenerator,
  DaggersAiGrid,
  DaggersAiTerrain,
  DaggersAiTerrainLayer,
  DaggersArtifactLayer,
  DaggersBattlePos,
  DaggersBattleVar,
  DaggersBoardHeight,
  DaggersBoardWidth,
  DaggersCommand,
  DaggersGenerator,
  DaggersGrid,
  DaggersLayer,
  DaggersMark,
  DaggersPhase,
  DaggersPosition,
  DaggersTerrain,
  DaggersTurnPos,
  DaggersTurnVar,
  DaggersUnit
>;

export type DaggersGrid = never;

export type DaggersAiGenerator = never;

export type DaggersAiAspect = never;

export type DaggersAiGrid = never;

export type DaggersAiArtifactLayer = never;

export type DaggersAiBrain = never;

export type DaggersAiTerrainLayer = never;

export type DaggersAiTerrain = never;

export type DaggersPosition =
  | "a1"
  | "a2"
  | "a3"
  | "a4"
  | "a5"
  | "a6"
  | "a7"
  | "a8"
  | "b1"
  | "b2"
  | "b3"
  | "b4"
  | "b5"
  | "b6"
  | "b7"
  | "b8"
  | "c1"
  | "c2"
  | "c3"
  | "c4"
  | "c5"
  | "c6"
  | "c7"
  | "c8"
  | "d1"
  | "d2"
  | "d3"
  | "d4"
  | "d5"
  | "d6"
  | "d7"
  | "d8"
  | "e1"
  | "e2"
  | "e3"
  | "e4"
  | "e5"
  | "e6"
  | "e7"
  | "e8"
  | "f1"
  | "f2"
  | "f3"
  | "f4"
  | "f5"
  | "f6"
  | "f7"
  | "f8"
  | "g1"
  | "g2"
  | "g3"
  | "g4"
  | "g5"
  | "g6"
  | "g7"
  | "g8"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "h7"
  | "h8";
