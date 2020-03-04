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

export type ShoveoffBoardHeight = 4;
export type ShoveoffBoardWidth = 4;

export type ShoveoffAnim = AlgolAnimCollection<
  ShoveoffBattlePos,
  ShoveoffBattleVar,
  ShoveoffCommand,
  ShoveoffGrid,
  ShoveoffLayer,
  ShoveoffMark,
  ShoveoffTurnPos,
  ShoveoffTurnVar,
  ShoveoffUnit
>;

export type ShoveoffTerrain =
  | "southedge"
  | "northedge"
  | "westedge"
  | "eastedge"
  | "edge";
export type ShoveoffUnit = "soldiers";
export type ShoveoffMark = "selectpushpoint";
export type ShoveoffCommand = "north" | "south" | "east" | "west";
export type ShoveoffPhaseCommand = never;
export type ShoveoffPhase = "startTurn" | ShoveoffMark;
export type ShoveoffUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "soldiers"
  | "mysoldiers"
  | "oppsoldiers"
  | "neutralsoldiers";
export type ShoveoffGenerator =
  | "findaffected"
  | "findresults"
  | "findfourinarow";
export type ShoveoffArtifactLayer =
  | "targetedgepoints"
  | "squishsouth"
  | "squishwest"
  | "squishnorth"
  | "squisheast"
  | "pushsouth"
  | "pushwest"
  | "pushnorth"
  | "pusheast"
  | "spawnsouth"
  | "spawnwest"
  | "spawnnorth"
  | "spawneast"
  | "fourinarow";
export type ShoveoffTerrainLayer =
  | "southedge"
  | "northedge"
  | "westedge"
  | "eastedge"
  | "edge"
  | "nosouthedge"
  | "nonorthedge"
  | "nowestedge"
  | "noeastedge"
  | "noedge";
export type ShoveoffLayer =
  | CommonLayer
  | ShoveoffUnitLayer
  | ShoveoffArtifactLayer
  | ShoveoffTerrainLayer;
export type ShoveoffBattlePos = never;
export type ShoveoffBattleVar = never;
export type ShoveoffTurnPos = never;
export type ShoveoffTurnVar = never;

export type ShoveoffBoardName = "basic";
export type ShoveoffSetupName = "basic";
export type ShoveoffRulesetName = "basic";
export type ShoveoffVariantName = "basic";

export type ShoveoffVariantBook = AlgolVariantBook<
  ShoveoffBoardName,
  ShoveoffRulesetName,
  ShoveoffSetupName
>;

export type ShoveoffGenerators = Generators<
  ShoveoffArtifactLayer,
  ShoveoffBattlePos,
  ShoveoffBattleVar,
  ShoveoffCommand,
  ShoveoffGenerator,
  ShoveoffGrid,
  ShoveoffLayer,
  ShoveoffMark,
  ShoveoffTurnPos,
  ShoveoffTurnVar
>;
export type ShoveoffFlow = Flow<
  ShoveoffBattlePos,
  ShoveoffBattleVar,
  ShoveoffCommand,
  ShoveoffGenerator,
  ShoveoffGrid,
  ShoveoffLayer,
  ShoveoffMark,
  ShoveoffTurnPos,
  ShoveoffTurnVar,
  ShoveoffUnit
>;
export type ShoveoffBoard = AlgolBoard<
  ShoveoffBoardHeight,
  ShoveoffBoardWidth,
  ShoveoffGrid,
  ShoveoffPosition,
  ShoveoffTerrain
>;
export type ShoveoffAI = AI<
  ShoveoffAiArtifactLayer,
  ShoveoffAiAspect,
  ShoveoffAiBrain,
  ShoveoffAiGenerator,
  ShoveoffAiGrid,
  ShoveoffAiTerrain,
  ShoveoffAiTerrainLayer,
  ShoveoffBattlePos,
  ShoveoffBattleVar,
  ShoveoffBoardHeight,
  ShoveoffBoardWidth,
  ShoveoffCommand,
  ShoveoffGrid,
  ShoveoffLayer,
  ShoveoffMark,
  ShoveoffPosition,
  ShoveoffTurnPos,
  ShoveoffTurnVar
>;
export type ShoveoffGraphics = Graphics<ShoveoffTerrain, ShoveoffUnit>;
export type ShoveoffInstructions = Instructions<
  ShoveoffBattlePos,
  ShoveoffBattleVar,
  ShoveoffCommand,
  ShoveoffGrid,
  ShoveoffLayer,
  ShoveoffMark,
  ShoveoffPhase,
  ShoveoffTurnPos,
  ShoveoffTurnVar,
  ShoveoffUnit
>;
export type ShoveoffMeta = AlgolMeta<ShoveoffCommand, ShoveoffMark>;
export type ShoveoffPerformance = AlgolPerformance<
  ShoveoffCommand,
  ShoveoffMark
>;
export type ShoveoffScripts = AlgolGameTestSuite<
  ShoveoffCommand,
  ShoveoffPosition
>;
export type ShoveoffSetupBook = AlgolSetupBook<ShoveoffPosition, ShoveoffUnit>;

export type ShoveoffDefinition = FullDef<
  ShoveoffAiArtifactLayer,
  ShoveoffAiAspect,
  ShoveoffAiBrain,
  ShoveoffAiGenerator,
  ShoveoffAiGrid,
  ShoveoffAiTerrain,
  ShoveoffAiTerrainLayer,
  ShoveoffArtifactLayer,
  ShoveoffBattlePos,
  ShoveoffBattleVar,
  ShoveoffBoardHeight,
  ShoveoffBoardWidth,
  ShoveoffCommand,
  ShoveoffGenerator,
  ShoveoffGrid,
  ShoveoffLayer,
  ShoveoffMark,
  ShoveoffPhase,
  ShoveoffPosition,
  ShoveoffTerrain,
  ShoveoffTurnPos,
  ShoveoffTurnVar,
  ShoveoffUnit
>;

export type ShoveoffGrid = never;

export type ShoveoffAiGenerator = never;

export type ShoveoffAiAspect = never;

export type ShoveoffAiGrid = never;

export type ShoveoffAiArtifactLayer = never;

export type ShoveoffAiBrain = never;

export type ShoveoffAiTerrainLayer = never;

export type ShoveoffAiTerrain = never;

export type ShoveoffPosition =
  | "a1"
  | "a2"
  | "a3"
  | "a4"
  | "b1"
  | "b2"
  | "b3"
  | "b4"
  | "c1"
  | "c2"
  | "c3"
  | "c4"
  | "d1"
  | "d2"
  | "d3"
  | "d4";
