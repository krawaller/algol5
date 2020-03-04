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

export type AmazonsBoardHeight = 10;
export type AmazonsBoardWidth = 10;

export type AmazonsAnim = AlgolAnimCollection<
  AmazonsBattlePos,
  AmazonsBattleVar,
  AmazonsCommand,
  AmazonsGrid,
  AmazonsLayer,
  AmazonsMark,
  AmazonsTurnPos,
  AmazonsTurnVar,
  AmazonsUnit
>;

export type AmazonsTerrain = never;
export type AmazonsUnit = "amazons" | "fires";
export type AmazonsMark =
  | "selectunit"
  | "selectmovetarget"
  | "selectfiretarget";
export type AmazonsCommand = "move" | "fire";
export type AmazonsPhaseCommand = "move";
export type AmazonsPhase = "startTurn" | AmazonsMark | AmazonsPhaseCommand;
export type AmazonsUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "amazons"
  | "myamazons"
  | "oppamazons"
  | "neutralamazons"
  | "fires"
  | "myfires"
  | "oppfires"
  | "neutralfires";
export type AmazonsGenerator = "findmovetargets" | "findfiretargets";
export type AmazonsArtifactLayer = "movetargets" | "firedfrom" | "firetargets";
export type AmazonsTerrainLayer = never;
export type AmazonsLayer =
  | CommonLayer
  | AmazonsUnitLayer
  | AmazonsArtifactLayer;
export type AmazonsBattlePos = never;
export type AmazonsBattleVar = never;
export type AmazonsTurnPos = never;
export type AmazonsTurnVar = never;

export type AmazonsBoardName = "basic";
export type AmazonsSetupName = "basic";
export type AmazonsRulesetName = "basic";
export type AmazonsVariantName = "basic";

export type AmazonsVariantBook = AlgolVariantBook<
  AmazonsBoardName,
  AmazonsRulesetName,
  AmazonsSetupName
>;

export type AmazonsGenerators = Generators<
  AmazonsArtifactLayer,
  AmazonsBattlePos,
  AmazonsBattleVar,
  AmazonsCommand,
  AmazonsGenerator,
  AmazonsGrid,
  AmazonsLayer,
  AmazonsMark,
  AmazonsTurnPos,
  AmazonsTurnVar
>;
export type AmazonsFlow = Flow<
  AmazonsBattlePos,
  AmazonsBattleVar,
  AmazonsCommand,
  AmazonsGenerator,
  AmazonsGrid,
  AmazonsLayer,
  AmazonsMark,
  AmazonsTurnPos,
  AmazonsTurnVar,
  AmazonsUnit
>;
export type AmazonsBoard = AlgolBoard<
  AmazonsBoardHeight,
  AmazonsBoardWidth,
  AmazonsGrid,
  AmazonsPosition,
  AmazonsTerrain
>;
export type AmazonsAI = AI<
  AmazonsAiArtifactLayer,
  AmazonsAiAspect,
  AmazonsAiBrain,
  AmazonsAiGenerator,
  AmazonsAiGrid,
  AmazonsAiTerrain,
  AmazonsAiTerrainLayer,
  AmazonsBattlePos,
  AmazonsBattleVar,
  AmazonsBoardHeight,
  AmazonsBoardWidth,
  AmazonsCommand,
  AmazonsGrid,
  AmazonsLayer,
  AmazonsMark,
  AmazonsPosition,
  AmazonsTurnPos,
  AmazonsTurnVar
>;
export type AmazonsGraphics = Graphics<AmazonsTerrain, AmazonsUnit>;
export type AmazonsInstructions = Instructions<
  AmazonsBattlePos,
  AmazonsBattleVar,
  AmazonsCommand,
  AmazonsGrid,
  AmazonsLayer,
  AmazonsMark,
  AmazonsPhase,
  AmazonsTurnPos,
  AmazonsTurnVar,
  AmazonsUnit
>;
export type AmazonsMeta = AlgolMeta<AmazonsCommand, AmazonsMark>;
export type AmazonsPerformance = AlgolPerformance<AmazonsCommand, AmazonsMark>;
export type AmazonsScripts = AlgolGameTestSuite<
  AmazonsCommand,
  AmazonsPosition
>;
export type AmazonsSetupBook = AlgolSetupBook<AmazonsPosition, AmazonsUnit>;

export type AmazonsDefinition = FullDef<
  AmazonsAiArtifactLayer,
  AmazonsAiAspect,
  AmazonsAiBrain,
  AmazonsAiGenerator,
  AmazonsAiGrid,
  AmazonsAiTerrain,
  AmazonsAiTerrainLayer,
  AmazonsArtifactLayer,
  AmazonsBattlePos,
  AmazonsBattleVar,
  AmazonsBoardHeight,
  AmazonsBoardWidth,
  AmazonsCommand,
  AmazonsGenerator,
  AmazonsGrid,
  AmazonsLayer,
  AmazonsMark,
  AmazonsPhase,
  AmazonsPosition,
  AmazonsTerrain,
  AmazonsTurnPos,
  AmazonsTurnVar,
  AmazonsUnit
>;

export type AmazonsGrid = never;

export type AmazonsAiGenerator = "findroads" | "findreach";

export type AmazonsAiAspect = "myroads" | "mydomain" | "opproads" | "oppdomain";

export type AmazonsAiGrid = never;

export type AmazonsAiArtifactLayer =
  | "myroads"
  | "opproads"
  | "myreach"
  | "oppreach";

export type AmazonsAiBrain = "Steve";

export type AmazonsAiTerrainLayer = never;

export type AmazonsAiTerrain = never;

export type AmazonsPosition =
  | "a1"
  | "a10"
  | "a2"
  | "a3"
  | "a4"
  | "a5"
  | "a6"
  | "a7"
  | "a8"
  | "a9"
  | "b1"
  | "b10"
  | "b2"
  | "b3"
  | "b4"
  | "b5"
  | "b6"
  | "b7"
  | "b8"
  | "b9"
  | "c1"
  | "c10"
  | "c2"
  | "c3"
  | "c4"
  | "c5"
  | "c6"
  | "c7"
  | "c8"
  | "c9"
  | "d1"
  | "d10"
  | "d2"
  | "d3"
  | "d4"
  | "d5"
  | "d6"
  | "d7"
  | "d8"
  | "d9"
  | "e1"
  | "e10"
  | "e2"
  | "e3"
  | "e4"
  | "e5"
  | "e6"
  | "e7"
  | "e8"
  | "e9"
  | "f1"
  | "f10"
  | "f2"
  | "f3"
  | "f4"
  | "f5"
  | "f6"
  | "f7"
  | "f8"
  | "f9"
  | "g1"
  | "g10"
  | "g2"
  | "g3"
  | "g4"
  | "g5"
  | "g6"
  | "g7"
  | "g8"
  | "g9"
  | "h1"
  | "h10"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "h7"
  | "h8"
  | "h9"
  | "i1"
  | "i10"
  | "i2"
  | "i3"
  | "i4"
  | "i5"
  | "i6"
  | "i7"
  | "i8"
  | "i9"
  | "j1"
  | "j10"
  | "j2"
  | "j3"
  | "j4"
  | "j5"
  | "j6"
  | "j7"
  | "j8"
  | "j9";
