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

export type GekitaiBoardHeight = 6;
export type GekitaiBoardWidth = 6;

export type GekitaiAnim = AlgolAnimCollection<
  GekitaiBattlePos,
  GekitaiBattleVar,
  GekitaiCommand,
  GekitaiGrid,
  GekitaiLayer,
  GekitaiMark,
  GekitaiTurnPos,
  GekitaiTurnVar,
  GekitaiUnit
>;

export type GekitaiTerrain = never;
export type GekitaiUnit = "markers";
export type GekitaiMark = "selectdroptarget";
export type GekitaiCommand = "drop";
export type GekitaiPhaseCommand = never;
export type GekitaiPhase = "startTurn" | GekitaiMark;
export type GekitaiUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "markers"
  | "mymarkers"
  | "oppmarkers"
  | "neutralmarkers";
export type GekitaiGenerator = "findendline" | "findpushconsequences";
export type GekitaiArtifactLayer = "winline" | "loseline" | "death" | "push";
export type GekitaiTerrainLayer = never;
export type GekitaiLayer =
  | CommonLayer
  | GekitaiUnitLayer
  | GekitaiArtifactLayer;
export type GekitaiBattlePos = never;
export type GekitaiBattleVar = never;
export type GekitaiTurnPos = never;
export type GekitaiTurnVar = never;

export type GekitaiGenerators = Generators<
  GekitaiArtifactLayer,
  GekitaiBattlePos,
  GekitaiBattleVar,
  GekitaiCommand,
  GekitaiGenerator,
  GekitaiGrid,
  GekitaiLayer,
  GekitaiMark,
  GekitaiTurnPos,
  GekitaiTurnVar
>;
export type GekitaiFlow = Flow<
  GekitaiBattlePos,
  GekitaiBattleVar,
  GekitaiCommand,
  GekitaiGenerator,
  GekitaiGrid,
  GekitaiLayer,
  GekitaiMark,
  GekitaiTurnPos,
  GekitaiTurnVar,
  GekitaiUnit
>;
export type GekitaiBoard = AlgolBoard<
  GekitaiBoardHeight,
  GekitaiBoardWidth,
  GekitaiGrid,
  GekitaiPosition,
  GekitaiTerrain
>;
export type GekitaiAI = AI<
  GekitaiAiArtifactLayer,
  GekitaiAiAspect,
  GekitaiAiBrain,
  GekitaiAiGenerator,
  GekitaiAiGrid,
  GekitaiAiTerrain,
  GekitaiAiTerrainLayer,
  GekitaiBattlePos,
  GekitaiBattleVar,
  GekitaiBoardHeight,
  GekitaiBoardWidth,
  GekitaiCommand,
  GekitaiGrid,
  GekitaiLayer,
  GekitaiMark,
  GekitaiPosition,
  GekitaiTurnPos,
  GekitaiTurnVar
>;
export type GekitaiGraphics = Graphics<GekitaiTerrain, GekitaiUnit>;
export type GekitaiInstructions = Instructions<
  GekitaiBattlePos,
  GekitaiBattleVar,
  GekitaiCommand,
  GekitaiGrid,
  GekitaiLayer,
  GekitaiMark,
  GekitaiPhase,
  GekitaiTurnPos,
  GekitaiTurnVar,
  GekitaiUnit
>;
export type GekitaiMeta = AlgolMeta<GekitaiCommand, GekitaiMark>;
export type GekitaiPerformance = AlgolPerformance<GekitaiCommand, GekitaiMark>;
export type GekitaiScripts = AlgolGameTestSuite<
  GekitaiCommand,
  GekitaiPosition
>;
export type GekitaiSetupBook = AlgolSetupBook<GekitaiPosition, GekitaiUnit>;

export type GekitaiDefinition = FullDef<
  GekitaiAiArtifactLayer,
  GekitaiAiAspect,
  GekitaiAiBrain,
  GekitaiAiGenerator,
  GekitaiAiGrid,
  GekitaiAiTerrain,
  GekitaiAiTerrainLayer,
  GekitaiArtifactLayer,
  GekitaiBattlePos,
  GekitaiBattleVar,
  GekitaiBoardHeight,
  GekitaiBoardWidth,
  GekitaiCommand,
  GekitaiGenerator,
  GekitaiGrid,
  GekitaiLayer,
  GekitaiMark,
  GekitaiPhase,
  GekitaiPosition,
  GekitaiTerrain,
  GekitaiTurnPos,
  GekitaiTurnVar,
  GekitaiUnit
>;

export type GekitaiGrid = never;

export type GekitaiAiGenerator = never;

export type GekitaiAiAspect = never;

export type GekitaiAiGrid = never;

export type GekitaiAiArtifactLayer = never;

export type GekitaiAiBrain = never;

export type GekitaiAiTerrainLayer = never;

export type GekitaiAiTerrain = never;

export type GekitaiPosition =
  | "a1"
  | "a2"
  | "a3"
  | "a4"
  | "a5"
  | "a6"
  | "b1"
  | "b2"
  | "b3"
  | "b4"
  | "b5"
  | "b6"
  | "c1"
  | "c2"
  | "c3"
  | "c4"
  | "c5"
  | "c6"
  | "d1"
  | "d2"
  | "d3"
  | "d4"
  | "d5"
  | "d6"
  | "e1"
  | "e2"
  | "e3"
  | "e4"
  | "e5"
  | "e6"
  | "f1"
  | "f2"
  | "f3"
  | "f4"
  | "f5"
  | "f6";
