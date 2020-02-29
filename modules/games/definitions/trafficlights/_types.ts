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

export type TrafficlightsBoardHeight = 3;
export type TrafficlightsBoardWidth = 4;

export type TrafficlightsAnim = AlgolAnimCollection<
  TrafficlightsBattlePos,
  TrafficlightsBattleVar,
  TrafficlightsCommand,
  TrafficlightsGrid,
  TrafficlightsLayer,
  TrafficlightsMark,
  TrafficlightsTurnPos,
  TrafficlightsTurnVar,
  TrafficlightsUnit
>;

export type TrafficlightsTerrain = never;
export type TrafficlightsUnit = "kings" | "pawns" | "bishops";
export type TrafficlightsMark = "selectdeploytarget" | "selectunit";
export type TrafficlightsCommand = "deploy" | "promote";
export type TrafficlightsPhaseCommand = never;
export type TrafficlightsPhase = "startTurn" | TrafficlightsMark;
export type TrafficlightsUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "kings"
  | "mykings"
  | "oppkings"
  | "neutralkings"
  | "pawns"
  | "mypawns"
  | "opppawns"
  | "neutralpawns"
  | "bishops"
  | "mybishops"
  | "oppbishops"
  | "neutralbishops";
export type TrafficlightsGenerator = "findlines";
export type TrafficlightsArtifactLayer = "line";
export type TrafficlightsTerrainLayer = never;
export type TrafficlightsLayer =
  | CommonLayer
  | TrafficlightsUnitLayer
  | TrafficlightsArtifactLayer;
export type TrafficlightsBattlePos = never;
export type TrafficlightsBattleVar = never;
export type TrafficlightsTurnPos = never;
export type TrafficlightsTurnVar = never;

export type TrafficlightsGenerators = Generators<
  TrafficlightsArtifactLayer,
  TrafficlightsBattlePos,
  TrafficlightsBattleVar,
  TrafficlightsCommand,
  TrafficlightsGenerator,
  TrafficlightsGrid,
  TrafficlightsLayer,
  TrafficlightsMark,
  TrafficlightsTurnPos,
  TrafficlightsTurnVar
>;
export type TrafficlightsFlow = Flow<
  TrafficlightsBattlePos,
  TrafficlightsBattleVar,
  TrafficlightsCommand,
  TrafficlightsGenerator,
  TrafficlightsGrid,
  TrafficlightsLayer,
  TrafficlightsMark,
  TrafficlightsTurnPos,
  TrafficlightsTurnVar,
  TrafficlightsUnit
>;
export type TrafficlightsBoard = AlgolBoard<
  TrafficlightsBoardHeight,
  TrafficlightsBoardWidth,
  TrafficlightsGrid,
  TrafficlightsPosition,
  TrafficlightsTerrain
>;
export type TrafficlightsAI = AI<
  TrafficlightsAiArtifactLayer,
  TrafficlightsAiAspect,
  TrafficlightsAiBrain,
  TrafficlightsAiGenerator,
  TrafficlightsAiGrid,
  TrafficlightsAiTerrain,
  TrafficlightsAiTerrainLayer,
  TrafficlightsBattlePos,
  TrafficlightsBattleVar,
  TrafficlightsBoardHeight,
  TrafficlightsBoardWidth,
  TrafficlightsCommand,
  TrafficlightsGrid,
  TrafficlightsLayer,
  TrafficlightsMark,
  TrafficlightsPosition,
  TrafficlightsTurnPos,
  TrafficlightsTurnVar
>;
export type TrafficlightsGraphics = Graphics<
  TrafficlightsTerrain,
  TrafficlightsUnit
>;
export type TrafficlightsInstructions = Instructions<
  TrafficlightsBattlePos,
  TrafficlightsBattleVar,
  TrafficlightsCommand,
  TrafficlightsGrid,
  TrafficlightsLayer,
  TrafficlightsMark,
  TrafficlightsPhase,
  TrafficlightsTurnPos,
  TrafficlightsTurnVar,
  TrafficlightsUnit
>;
export type TrafficlightsMeta = AlgolMeta<
  TrafficlightsCommand,
  TrafficlightsMark
>;
export type TrafficlightsPerformance = AlgolPerformance<
  TrafficlightsCommand,
  TrafficlightsMark
>;
export type TrafficlightsScripts = AlgolGameTestSuite<
  TrafficlightsCommand,
  TrafficlightsPosition
>;
export type TrafficlightsSetupBook = AlgolSetupBook<
  TrafficlightsPosition,
  TrafficlightsUnit
>;

export type TrafficlightsDefinition = FullDef<
  TrafficlightsAiArtifactLayer,
  TrafficlightsAiAspect,
  TrafficlightsAiBrain,
  TrafficlightsAiGenerator,
  TrafficlightsAiGrid,
  TrafficlightsAiTerrain,
  TrafficlightsAiTerrainLayer,
  TrafficlightsArtifactLayer,
  TrafficlightsBattlePos,
  TrafficlightsBattleVar,
  TrafficlightsBoardHeight,
  TrafficlightsBoardWidth,
  TrafficlightsCommand,
  TrafficlightsGenerator,
  TrafficlightsGrid,
  TrafficlightsLayer,
  TrafficlightsMark,
  TrafficlightsPhase,
  TrafficlightsPosition,
  TrafficlightsTerrain,
  TrafficlightsTurnPos,
  TrafficlightsTurnVar,
  TrafficlightsUnit
>;

export type TrafficlightsGrid = never;

export type TrafficlightsAiGenerator = never;

export type TrafficlightsAiAspect = never;

export type TrafficlightsAiGrid = never;

export type TrafficlightsAiArtifactLayer = never;

export type TrafficlightsAiBrain = never;

export type TrafficlightsAiTerrainLayer = never;

export type TrafficlightsAiTerrain = never;

export type TrafficlightsPosition =
  | "a1"
  | "a2"
  | "a3"
  | "b1"
  | "b2"
  | "b3"
  | "c1"
  | "c2"
  | "c3"
  | "d1"
  | "d2"
  | "d3";
