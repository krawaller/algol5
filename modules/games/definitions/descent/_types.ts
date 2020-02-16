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
  AlgolSetup,
  AlgolGameTestSuite,
  FullDef,
  AlgolPerformance
} from "../../../types";

export type DescentBoardHeight = 4;
export type DescentBoardWidth = 4;

export type DescentAnim = AlgolAnimCollection<
  DescentBattlePos,
  DescentBattleVar,
  DescentCommand,
  DescentGrid,
  DescentLayer,
  DescentMark,
  DescentTurnPos,
  DescentTurnVar,
  DescentUnit
>;

export type DescentTerrain = never;
export type DescentUnit = "lvl3" | "lvl2" | "lvl1" | "lvl0";
export type DescentMark = "selectunit" | "selectmovetarget" | "selectdigtarget";
export type DescentCommand = "move" | "dig";
export type DescentPhaseCommand = "move";
export type DescentPhase = "startTurn" | DescentMark | DescentPhaseCommand;
export type DescentUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "lvl3"
  | "mylvl3"
  | "opplvl3"
  | "neutrallvl3"
  | "lvl2"
  | "mylvl2"
  | "opplvl2"
  | "neutrallvl2"
  | "lvl1"
  | "mylvl1"
  | "opplvl1"
  | "neutrallvl1"
  | "lvl0"
  | "mylvl0"
  | "opplvl0"
  | "neutrallvl0";
export type DescentGenerator =
  | "findmovetargets"
  | "finddigtargets"
  | "findwinlines";
export type DescentArtifactLayer = "movetargets" | "digtargets" | "winline";
export type DescentTerrainLayer = never;
export type DescentLayer =
  | CommonLayer
  | DescentUnitLayer
  | DescentArtifactLayer;
export type DescentBattlePos = never;
export type DescentBattleVar = never;
export type DescentTurnPos = "movedto";
export type DescentTurnVar = "heightto" | "heightfrom";

export type DescentGenerators = Generators<
  DescentArtifactLayer,
  DescentBattlePos,
  DescentBattleVar,
  DescentCommand,
  DescentGenerator,
  DescentGrid,
  DescentLayer,
  DescentMark,
  DescentTurnPos,
  DescentTurnVar
>;
export type DescentFlow = Flow<
  DescentBattlePos,
  DescentBattleVar,
  DescentCommand,
  DescentGenerator,
  DescentGrid,
  DescentLayer,
  DescentMark,
  DescentTurnPos,
  DescentTurnVar,
  DescentUnit
>;
export type DescentBoard = AlgolBoard<
  DescentBoardHeight,
  DescentBoardWidth,
  DescentGrid,
  DescentPosition,
  DescentTerrain
>;
export type DescentAI = AI<
  DescentAiArtifactLayer,
  DescentAiAspect,
  DescentAiBrain,
  DescentAiGenerator,
  DescentAiGrid,
  DescentAiTerrain,
  DescentAiTerrainLayer,
  DescentBattlePos,
  DescentBattleVar,
  DescentBoardHeight,
  DescentBoardWidth,
  DescentCommand,
  DescentGrid,
  DescentLayer,
  DescentMark,
  DescentPosition,
  DescentTurnPos,
  DescentTurnVar
>;
export type DescentGraphics = Graphics<DescentTerrain, DescentUnit>;
export type DescentInstructions = Instructions<
  DescentBattlePos,
  DescentBattleVar,
  DescentCommand,
  DescentGrid,
  DescentLayer,
  DescentMark,
  DescentPhase,
  DescentTurnPos,
  DescentTurnVar,
  DescentUnit
>;
export type DescentMeta = AlgolMeta<DescentCommand, DescentMark>;
export type DescentPerformance = AlgolPerformance<DescentCommand, DescentMark>;
export type DescentScripts = AlgolGameTestSuite<
  DescentCommand,
  DescentPosition
>;
export type DescentSetup = AlgolSetup<DescentPosition, DescentUnit>;

export type DescentDefinition = FullDef<
  DescentAiArtifactLayer,
  DescentAiAspect,
  DescentAiBrain,
  DescentAiGenerator,
  DescentAiGrid,
  DescentAiTerrain,
  DescentAiTerrainLayer,
  DescentArtifactLayer,
  DescentBattlePos,
  DescentBattleVar,
  DescentBoardHeight,
  DescentBoardWidth,
  DescentCommand,
  DescentGenerator,
  DescentGrid,
  DescentLayer,
  DescentMark,
  DescentPhase,
  DescentPosition,
  DescentTerrain,
  DescentTurnPos,
  DescentTurnVar,
  DescentUnit
>;

export type DescentGrid = never;

export type DescentAiGenerator = never;

export type DescentAiAspect = never;

export type DescentAiGrid = never;

export type DescentAiArtifactLayer = never;

export type DescentAiBrain = never;

export type DescentAiTerrainLayer = never;

export type DescentAiTerrain = never;

export type DescentPosition =
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
