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
  Setup,
  AlgolGameTestSuite,
  FullDef,
  AlgolPerformance
} from "../../../types";

export type MurusgallicusBoardHeight = 7;
export type MurusgallicusBoardWidth = 8;

export type MurusgallicusAnim = AlgolAnimCollection<
  MurusgallicusBattlePos,
  MurusgallicusBattleVar,
  MurusgallicusCommand,
  MurusgallicusGrid,
  MurusgallicusLayer,
  MurusgallicusMark,
  MurusgallicusTurnPos,
  MurusgallicusTurnVar,
  MurusgallicusUnit
>;

export type MurusgallicusTerrain = "homerow";
export type MurusgallicusUnit = "towers" | "walls";
export type MurusgallicusMark = "selecttower" | "selectmove" | "selectcrush";
export type MurusgallicusCommand = "move" | "crush";
export type MurusgallicusPhaseCommand = never;
export type MurusgallicusPhase = "startTurn" | MurusgallicusMark;
export type MurusgallicusUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "towers"
  | "mytowers"
  | "opptowers"
  | "walls"
  | "mywalls"
  | "oppwalls";
export type MurusgallicusGenerator =
  | "findmovetargets"
  | "findmoveresults"
  | "findcrushtargets";
export type MurusgallicusArtifactLayer =
  | "movetargets"
  | "madetowers"
  | "madewalls"
  | "crushtargets";
export type MurusgallicusTerrainLayer =
  | "homerow"
  | "myhomerow"
  | "opphomerow"
  | "nohomerow";
export type MurusgallicusLayer =
  | CommonLayer
  | MurusgallicusUnitLayer
  | MurusgallicusArtifactLayer
  | MurusgallicusTerrainLayer;
export type MurusgallicusBattlePos = never;
export type MurusgallicusBattleVar = never;
export type MurusgallicusTurnPos = never;
export type MurusgallicusTurnVar = never;

export type MurusgallicusGenerators = Generators<
  MurusgallicusArtifactLayer,
  MurusgallicusBattlePos,
  MurusgallicusBattleVar,
  MurusgallicusCommand,
  MurusgallicusGenerator,
  MurusgallicusGrid,
  MurusgallicusLayer,
  MurusgallicusMark,
  MurusgallicusTurnPos,
  MurusgallicusTurnVar
>;
export type MurusgallicusFlow = Flow<
  MurusgallicusBattlePos,
  MurusgallicusBattleVar,
  MurusgallicusCommand,
  MurusgallicusGenerator,
  MurusgallicusGrid,
  MurusgallicusLayer,
  MurusgallicusMark,
  MurusgallicusTurnPos,
  MurusgallicusTurnVar,
  MurusgallicusUnit
>;
export type MurusgallicusBoard = AlgolBoard<
  MurusgallicusBoardHeight,
  MurusgallicusBoardWidth,
  MurusgallicusGrid,
  MurusgallicusPosition,
  MurusgallicusTerrain
>;
export type MurusgallicusAI = AI<
  MurusgallicusAiArtifactLayer,
  MurusgallicusAiAspect,
  MurusgallicusAiBrain,
  MurusgallicusAiGenerator,
  MurusgallicusAiGrid,
  MurusgallicusAiTerrain,
  MurusgallicusAiTerrainLayer,
  MurusgallicusBattlePos,
  MurusgallicusBattleVar,
  MurusgallicusBoardHeight,
  MurusgallicusBoardWidth,
  MurusgallicusCommand,
  MurusgallicusGrid,
  MurusgallicusLayer,
  MurusgallicusMark,
  MurusgallicusPosition,
  MurusgallicusTurnPos,
  MurusgallicusTurnVar
>;
export type MurusgallicusGraphics = Graphics<
  MurusgallicusTerrain,
  MurusgallicusUnit
>;
export type MurusgallicusInstructions = Instructions<
  MurusgallicusBattlePos,
  MurusgallicusBattleVar,
  MurusgallicusCommand,
  MurusgallicusGrid,
  MurusgallicusLayer,
  MurusgallicusMark,
  MurusgallicusPhase,
  MurusgallicusTurnPos,
  MurusgallicusTurnVar,
  MurusgallicusUnit
>;
export type MurusgallicusMeta = AlgolMeta<
  MurusgallicusCommand,
  MurusgallicusMark
>;
export type MurusgallicusPerformance = AlgolPerformance<
  MurusgallicusCommand,
  MurusgallicusMark
>;
export type MurusgallicusScripts = AlgolGameTestSuite<
  MurusgallicusCommand,
  MurusgallicusPosition
>;
export type MurusgallicusSetup = Setup<
  MurusgallicusPosition,
  MurusgallicusUnit
>;

export type MurusgallicusDefinition = FullDef<
  MurusgallicusAiArtifactLayer,
  MurusgallicusAiAspect,
  MurusgallicusAiBrain,
  MurusgallicusAiGenerator,
  MurusgallicusAiGrid,
  MurusgallicusAiTerrain,
  MurusgallicusAiTerrainLayer,
  MurusgallicusArtifactLayer,
  MurusgallicusBattlePos,
  MurusgallicusBattleVar,
  MurusgallicusBoardHeight,
  MurusgallicusBoardWidth,
  MurusgallicusCommand,
  MurusgallicusGenerator,
  MurusgallicusGrid,
  MurusgallicusLayer,
  MurusgallicusMark,
  MurusgallicusPhase,
  MurusgallicusPosition,
  MurusgallicusTerrain,
  MurusgallicusTurnPos,
  MurusgallicusTurnVar,
  MurusgallicusUnit
>;

export type MurusgallicusGrid = never;

export type MurusgallicusAiGenerator =
  | "findmymoves"
  | "findoppmoves"
  | "findoppthreats";

export type MurusgallicusAiAspect =
  | "mymoves"
  | "mytowerpos"
  | "mywallpos"
  | "oppmoves"
  | "mytowercount"
  | "oppwinmoves"
  | "opplightthreats"
  | "oppheavythreats";

export type MurusgallicusAiGrid = "basic1" | "basic2";

export type MurusgallicusAiArtifactLayer =
  | "mymoves"
  | "oppmoves"
  | "oppheavythreats"
  | "opplightthreats";

export type MurusgallicusAiBrain = "Steve" | "Joe" | "Clive";

export type MurusgallicusAiTerrainLayer =
  | "threatrow"
  | "mythreatrow"
  | "oppthreatrow"
  | "nothreatrow";

export type MurusgallicusAiTerrain = "threatrow";

export type MurusgallicusPosition =
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
  | "g7"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "h7";
