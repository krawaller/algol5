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
  AlgolPerformance,
  AlgolVariantBook
} from "../../../types";

export type MomentumBoardHeight = 7;
export type MomentumBoardWidth = 7;

export type MomentumAnim = AlgolAnimCollection<
  MomentumBattlePos,
  MomentumBattleVar,
  MomentumCommand,
  MomentumGrid,
  MomentumLayer,
  MomentumMark,
  MomentumTurnPos,
  MomentumTurnVar,
  MomentumUnit
>;

export type MomentumTerrain = never;
export type MomentumUnit = "stones";
export type MomentumMark = "selectdroptarget";
export type MomentumCommand = "pie" | "drop";
export type MomentumPhaseCommand = never;
export type MomentumPhase = "startTurn" | MomentumMark;
export type MomentumUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "stones"
  | "mystones"
  | "oppstones"
  | "neutralstones";
export type MomentumGenerator = "findpusheffects";
export type MomentumArtifactLayer = "doomed" | "pushed";
export type MomentumTerrainLayer = never;
export type MomentumLayer =
  | CommonLayer
  | MomentumUnitLayer
  | MomentumArtifactLayer;
export type MomentumBattlePos = never;
export type MomentumBattleVar = never;
export type MomentumTurnPos = never;
export type MomentumTurnVar = never;

export type MomentumBoardName = "basic";
export type MomentumSetupName = "basic";
export type MomentumRulesetName = "basic";
export type MomentumVariantName = "basic";

export type MomentumVariantBook = AlgolVariantBook<
  MomentumBoardName,
  MomentumRulesetName,
  MomentumSetupName
>;

export type MomentumGenerators = Generators<
  MomentumArtifactLayer,
  MomentumBattlePos,
  MomentumBattleVar,
  MomentumCommand,
  MomentumGenerator,
  MomentumGrid,
  MomentumLayer,
  MomentumMark,
  MomentumTurnPos,
  MomentumTurnVar
>;
export type MomentumFlow = Flow<
  MomentumBattlePos,
  MomentumBattleVar,
  MomentumCommand,
  MomentumGenerator,
  MomentumGrid,
  MomentumLayer,
  MomentumMark,
  MomentumTurnPos,
  MomentumTurnVar,
  MomentumUnit
>;
export type MomentumBoard = AlgolBoard<
  MomentumBoardHeight,
  MomentumBoardWidth,
  MomentumGrid,
  MomentumPosition,
  MomentumTerrain
>;
export type MomentumAI = AI<
  MomentumAiArtifactLayer,
  MomentumAiAspect,
  MomentumAiBrain,
  MomentumAiGenerator,
  MomentumAiGrid,
  MomentumAiTerrain,
  MomentumAiTerrainLayer,
  MomentumBattlePos,
  MomentumBattleVar,
  MomentumBoardHeight,
  MomentumBoardWidth,
  MomentumCommand,
  MomentumGrid,
  MomentumLayer,
  MomentumMark,
  MomentumPosition,
  MomentumTurnPos,
  MomentumTurnVar
>;
export type MomentumGraphics = Graphics<MomentumTerrain, MomentumUnit>;
export type MomentumInstructions = Instructions<
  MomentumBattlePos,
  MomentumBattleVar,
  MomentumCommand,
  MomentumGrid,
  MomentumLayer,
  MomentumMark,
  MomentumPhase,
  MomentumTurnPos,
  MomentumTurnVar,
  MomentumUnit
>;
export type MomentumMeta = AlgolMeta<MomentumCommand, MomentumMark>;
export type MomentumPerformance = AlgolPerformance<
  MomentumCommand,
  MomentumMark
>;
export type MomentumScripts = AlgolGameTestSuite<
  MomentumCommand,
  MomentumPosition
>;
export type MomentumSetupBook = AlgolSetupBook<MomentumPosition, MomentumUnit>;

export type MomentumDefinition = FullDef<
  MomentumAiArtifactLayer,
  MomentumAiAspect,
  MomentumAiBrain,
  MomentumAiGenerator,
  MomentumAiGrid,
  MomentumAiTerrain,
  MomentumAiTerrainLayer,
  MomentumArtifactLayer,
  MomentumBattlePos,
  MomentumBattleVar,
  MomentumBoardHeight,
  MomentumBoardWidth,
  MomentumCommand,
  MomentumGenerator,
  MomentumGrid,
  MomentumLayer,
  MomentumMark,
  MomentumPhase,
  MomentumPosition,
  MomentumTerrain,
  MomentumTurnPos,
  MomentumTurnVar,
  MomentumUnit
>;

export type MomentumGrid = never;

export type MomentumAiGenerator = never;

export type MomentumAiAspect = never;

export type MomentumAiGrid = never;

export type MomentumAiArtifactLayer = never;

export type MomentumAiBrain = never;

export type MomentumAiTerrainLayer = never;

export type MomentumAiTerrain = never;

export type MomentumPosition =
  | "a1"
  | "a2"
  | "a3"
  | "a4"
  | "a5"
  | "a6"
  | "a7"
  | "b1"
  | "b2"
  | "b3"
  | "b4"
  | "b5"
  | "b6"
  | "b7"
  | "c1"
  | "c2"
  | "c3"
  | "c4"
  | "c5"
  | "c6"
  | "c7"
  | "d1"
  | "d2"
  | "d3"
  | "d4"
  | "d5"
  | "d6"
  | "d7"
  | "e1"
  | "e2"
  | "e3"
  | "e4"
  | "e5"
  | "e6"
  | "e7"
  | "f1"
  | "f2"
  | "f3"
  | "f4"
  | "f5"
  | "f6"
  | "f7"
  | "g1"
  | "g2"
  | "g3"
  | "g4"
  | "g5"
  | "g6"
  | "g7";
