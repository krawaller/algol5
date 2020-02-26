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

export type ChameleonBoardHeight = 5;
export type ChameleonBoardWidth = 5;

export type ChameleonAnim = AlgolAnimCollection<
  ChameleonBattlePos,
  ChameleonBattleVar,
  ChameleonCommand,
  ChameleonGrid,
  ChameleonLayer,
  ChameleonMark,
  ChameleonTurnPos,
  ChameleonTurnVar,
  ChameleonUnit
>;

export type ChameleonTerrain = "base";
export type ChameleonUnit = "knights" | "bishops";
export type ChameleonMark = "selectunit" | "selectmovetarget";
export type ChameleonCommand = "move";
export type ChameleonPhaseCommand = never;
export type ChameleonPhase = "startTurn" | ChameleonMark;
export type ChameleonUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "knights"
  | "myknights"
  | "oppknights"
  | "neutralknights"
  | "bishops"
  | "mybishops"
  | "oppbishops"
  | "neutralbishops";
export type ChameleonGenerator =
  | "findinvaders"
  | "findsteptargets"
  | "findbishoptargets"
  | "findknighttargets";
export type ChameleonArtifactLayer = "invaders" | "morph" | "movetarget";
export type ChameleonTerrainLayer = "base" | "mybase" | "oppbase" | "nobase";
export type ChameleonLayer =
  | CommonLayer
  | ChameleonUnitLayer
  | ChameleonArtifactLayer
  | ChameleonTerrainLayer;
export type ChameleonBattlePos = never;
export type ChameleonBattleVar = never;
export type ChameleonTurnPos = never;
export type ChameleonTurnVar = never;

export type ChameleonGenerators = Generators<
  ChameleonArtifactLayer,
  ChameleonBattlePos,
  ChameleonBattleVar,
  ChameleonCommand,
  ChameleonGenerator,
  ChameleonGrid,
  ChameleonLayer,
  ChameleonMark,
  ChameleonTurnPos,
  ChameleonTurnVar
>;
export type ChameleonFlow = Flow<
  ChameleonBattlePos,
  ChameleonBattleVar,
  ChameleonCommand,
  ChameleonGenerator,
  ChameleonGrid,
  ChameleonLayer,
  ChameleonMark,
  ChameleonTurnPos,
  ChameleonTurnVar,
  ChameleonUnit
>;
export type ChameleonBoard = AlgolBoard<
  ChameleonBoardHeight,
  ChameleonBoardWidth,
  ChameleonGrid,
  ChameleonPosition,
  ChameleonTerrain
>;
export type ChameleonAI = AI<
  ChameleonAiArtifactLayer,
  ChameleonAiAspect,
  ChameleonAiBrain,
  ChameleonAiGenerator,
  ChameleonAiGrid,
  ChameleonAiTerrain,
  ChameleonAiTerrainLayer,
  ChameleonBattlePos,
  ChameleonBattleVar,
  ChameleonBoardHeight,
  ChameleonBoardWidth,
  ChameleonCommand,
  ChameleonGrid,
  ChameleonLayer,
  ChameleonMark,
  ChameleonPosition,
  ChameleonTurnPos,
  ChameleonTurnVar
>;
export type ChameleonGraphics = Graphics<ChameleonTerrain, ChameleonUnit>;
export type ChameleonInstructions = Instructions<
  ChameleonBattlePos,
  ChameleonBattleVar,
  ChameleonCommand,
  ChameleonGrid,
  ChameleonLayer,
  ChameleonMark,
  ChameleonPhase,
  ChameleonTurnPos,
  ChameleonTurnVar,
  ChameleonUnit
>;
export type ChameleonMeta = AlgolMeta<ChameleonCommand, ChameleonMark>;
export type ChameleonPerformance = AlgolPerformance<
  ChameleonCommand,
  ChameleonMark
>;
export type ChameleonScripts = AlgolGameTestSuite<
  ChameleonCommand,
  ChameleonPosition
>;
export type ChameleonSetupBook = AlgolSetupBook<
  ChameleonPosition,
  ChameleonUnit
>;

export type ChameleonDefinition = FullDef<
  ChameleonAiArtifactLayer,
  ChameleonAiAspect,
  ChameleonAiBrain,
  ChameleonAiGenerator,
  ChameleonAiGrid,
  ChameleonAiTerrain,
  ChameleonAiTerrainLayer,
  ChameleonArtifactLayer,
  ChameleonBattlePos,
  ChameleonBattleVar,
  ChameleonBoardHeight,
  ChameleonBoardWidth,
  ChameleonCommand,
  ChameleonGenerator,
  ChameleonGrid,
  ChameleonLayer,
  ChameleonMark,
  ChameleonPhase,
  ChameleonPosition,
  ChameleonTerrain,
  ChameleonTurnPos,
  ChameleonTurnVar,
  ChameleonUnit
>;

export type ChameleonGrid = never;

export type ChameleonAiGenerator = never;

export type ChameleonAiAspect = never;

export type ChameleonAiGrid = never;

export type ChameleonAiArtifactLayer = never;

export type ChameleonAiBrain = never;

export type ChameleonAiTerrainLayer = never;

export type ChameleonAiTerrain = never;

export type ChameleonPosition =
  | "a1"
  | "a2"
  | "a3"
  | "a4"
  | "a5"
  | "b1"
  | "b2"
  | "b3"
  | "b4"
  | "b5"
  | "c1"
  | "c2"
  | "c3"
  | "c4"
  | "c5"
  | "d1"
  | "d2"
  | "d3"
  | "d4"
  | "d5"
  | "e1"
  | "e2"
  | "e3"
  | "e4"
  | "e5";
