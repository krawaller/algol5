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

export type DuploBoardHeight = 8;
export type DuploBoardWidth = 8;

export type DuploAnim = AlgolAnimCollection<
  DuploBattlePos,
  DuploBattleVar,
  DuploCommand,
  DuploGrid,
  DuploLayer,
  DuploMark,
  DuploTurnPos,
  DuploTurnVar,
  DuploUnit
>;

export type DuploTerrain = never;
export type DuploUnit = "soldiers";
export type DuploMark = "selectdeploy" | "selectunit" | "selecttarget";
export type DuploCommand = "deploy" | "expand";
export type DuploPhaseCommand = "deploy";
export type DuploPhase = "startTurn" | DuploMark | DuploPhaseCommand;
export type DuploUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "soldiers"
  | "mysoldiers"
  | "oppsoldiers"
  | "neutralsoldiers";
export type DuploGenerator =
  | "findspawndirs"
  | "findgrowstarts"
  | "findexpandpoints"
  | "findoppstrengths"
  | "findspawns";
export type DuploArtifactLayer =
  | "spawndirs"
  | "growstarts"
  | "targets"
  | "potentialopptargets"
  | "spawns";
export type DuploTerrainLayer = never;
export type DuploLayer = CommonLayer | DuploUnitLayer | DuploArtifactLayer;
export type DuploBattlePos = never;
export type DuploBattleVar = never;
export type DuploTurnPos = never;
export type DuploTurnVar = never;

export type DuploBoardName = "basic";
export type DuploSetupName = "basic";
export type DuploRulesetName = "basic";
export type DuploVariantName = "basic";

export type DuploVariantBook = AlgolVariantBook<
  DuploBoardName,
  DuploRulesetName,
  DuploSetupName
>;

export type DuploGenerators = Generators<
  DuploArtifactLayer,
  DuploBattlePos,
  DuploBattleVar,
  DuploCommand,
  DuploGenerator,
  DuploGrid,
  DuploLayer,
  DuploMark,
  DuploTurnPos,
  DuploTurnVar
>;
export type DuploFlow = Flow<
  DuploBattlePos,
  DuploBattleVar,
  DuploCommand,
  DuploGenerator,
  DuploGrid,
  DuploLayer,
  DuploMark,
  DuploTurnPos,
  DuploTurnVar,
  DuploUnit
>;
export type DuploBoard = AlgolBoard<
  DuploBoardHeight,
  DuploBoardWidth,
  DuploGrid,
  DuploPosition,
  DuploTerrain
>;
export type DuploAI = AI<
  DuploAiArtifactLayer,
  DuploAiAspect,
  DuploAiBrain,
  DuploAiGenerator,
  DuploAiGrid,
  DuploAiTerrain,
  DuploAiTerrainLayer,
  DuploBattlePos,
  DuploBattleVar,
  DuploBoardHeight,
  DuploBoardWidth,
  DuploCommand,
  DuploGrid,
  DuploLayer,
  DuploMark,
  DuploPosition,
  DuploTurnPos,
  DuploTurnVar
>;
export type DuploGraphics = Graphics<DuploTerrain, DuploUnit>;
export type DuploInstructions = Instructions<
  DuploBattlePos,
  DuploBattleVar,
  DuploCommand,
  DuploGrid,
  DuploLayer,
  DuploMark,
  DuploPhase,
  DuploTurnPos,
  DuploTurnVar,
  DuploUnit
>;
export type DuploMeta = AlgolMeta<DuploCommand, DuploMark>;
export type DuploPerformance = AlgolPerformance<DuploCommand, DuploMark>;
export type DuploScripts = AlgolGameTestSuite<DuploCommand, DuploPosition>;
export type DuploSetupBook = AlgolSetupBook<DuploPosition, DuploUnit>;

export type DuploDefinition = FullDef<
  DuploAiArtifactLayer,
  DuploAiAspect,
  DuploAiBrain,
  DuploAiGenerator,
  DuploAiGrid,
  DuploAiTerrain,
  DuploAiTerrainLayer,
  DuploArtifactLayer,
  DuploBattlePos,
  DuploBattleVar,
  DuploBoardHeight,
  DuploBoardWidth,
  DuploCommand,
  DuploGenerator,
  DuploGrid,
  DuploLayer,
  DuploMark,
  DuploPhase,
  DuploPosition,
  DuploTerrain,
  DuploTurnPos,
  DuploTurnVar,
  DuploUnit
>;

export type DuploGrid = never;

export type DuploAiGenerator = never;

export type DuploAiAspect = never;

export type DuploAiGrid = never;

export type DuploAiArtifactLayer = never;

export type DuploAiBrain = never;

export type DuploAiTerrainLayer = never;

export type DuploAiTerrain = never;

export type DuploPosition =
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
