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

export type KriegBoardHeight = 4;
export type KriegBoardWidth = 4;

export type KriegAnim = AlgolAnimCollection<
  KriegBattlePos,
  KriegBattleVar,
  KriegCommand,
  KriegGrid,
  KriegLayer,
  KriegMark,
  KriegTurnPos,
  KriegTurnVar,
  KriegUnit
>;

export type KriegTerrain = "southeast" | "northwest" | "corners" | "bases";
export type KriegUnit = "notfrozens" | "frozens";
export type KriegMark = "selectunit" | "selectmove";
export type KriegCommand = "move";
export type KriegPhaseCommand = never;
export type KriegPhase = "startTurn" | KriegMark;
export type KriegUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "notfrozens"
  | "mynotfrozens"
  | "oppnotfrozens"
  | "neutralnotfrozens"
  | "frozens"
  | "myfrozens"
  | "oppfrozens"
  | "neutralfrozens";
export type KriegGenerator = "findmovetargets";
export type KriegArtifactLayer = "movetargets";
export type KriegTerrainLayer =
  | "southeast"
  | "northwest"
  | "corners"
  | "mycorners"
  | "oppcorners"
  | "bases"
  | "mybases"
  | "oppbases"
  | "nosoutheast"
  | "nonorthwest"
  | "nocorners"
  | "nobases";
export type KriegLayer =
  | CommonLayer
  | KriegUnitLayer
  | KriegArtifactLayer
  | KriegTerrainLayer;
export type KriegBattlePos = never;
export type KriegBattleVar = never;
export type KriegTurnPos = never;
export type KriegTurnVar = never;

export type KriegBoardName = "basic";
export type KriegSetupName = "basic";
export type KriegRulesetName = "basic";
export type KriegVariantName = "basic";

export type KriegVariantBook = AlgolVariantBook<
  KriegBoardName,
  KriegRulesetName,
  KriegSetupName
>;

export type KriegGenerators = Generators<
  KriegArtifactLayer,
  KriegBattlePos,
  KriegBattleVar,
  KriegCommand,
  KriegGenerator,
  KriegGrid,
  KriegLayer,
  KriegMark,
  KriegTurnPos,
  KriegTurnVar
>;
export type KriegFlow = Flow<
  KriegBattlePos,
  KriegBattleVar,
  KriegCommand,
  KriegGenerator,
  KriegGrid,
  KriegLayer,
  KriegMark,
  KriegTurnPos,
  KriegTurnVar,
  KriegUnit
>;
export type KriegBoard = AlgolBoard<
  KriegBoardHeight,
  KriegBoardWidth,
  KriegGrid,
  KriegPosition,
  KriegTerrain
>;
export type KriegAI = AI<
  KriegAiArtifactLayer,
  KriegAiAspect,
  KriegAiBrain,
  KriegAiGenerator,
  KriegAiGrid,
  KriegAiTerrain,
  KriegAiTerrainLayer,
  KriegBattlePos,
  KriegBattleVar,
  KriegBoardHeight,
  KriegBoardWidth,
  KriegCommand,
  KriegGrid,
  KriegLayer,
  KriegMark,
  KriegPosition,
  KriegTurnPos,
  KriegTurnVar
>;
export type KriegGraphics = Graphics<KriegTerrain, KriegUnit>;
export type KriegInstructions = Instructions<
  KriegBattlePos,
  KriegBattleVar,
  KriegCommand,
  KriegGrid,
  KriegLayer,
  KriegMark,
  KriegPhase,
  KriegTurnPos,
  KriegTurnVar,
  KriegUnit
>;
export type KriegMeta = AlgolMeta<KriegCommand, KriegMark>;
export type KriegPerformance = AlgolPerformance<KriegCommand, KriegMark>;
export type KriegScripts = AlgolGameTestSuite<KriegCommand, KriegPosition>;
export type KriegSetupBook = AlgolSetupBook<KriegPosition, KriegUnit>;

export type KriegDefinition = FullDef<
  KriegAiArtifactLayer,
  KriegAiAspect,
  KriegAiBrain,
  KriegAiGenerator,
  KriegAiGrid,
  KriegAiTerrain,
  KriegAiTerrainLayer,
  KriegArtifactLayer,
  KriegBattlePos,
  KriegBattleVar,
  KriegBoardHeight,
  KriegBoardWidth,
  KriegCommand,
  KriegGenerator,
  KriegGrid,
  KriegLayer,
  KriegMark,
  KriegPhase,
  KriegPosition,
  KriegTerrain,
  KriegTurnPos,
  KriegTurnVar,
  KriegUnit
>;

export type KriegGrid = never;

export type KriegAiGenerator = "findmythreats" | "findoppthreats";

export type KriegAiAspect =
  | "myfrozenguardedthreat"
  | "myfrozenfreethreat"
  | "mymoverguardedthreat"
  | "mymoverfreethreat"
  | "myfrozeninfiltrators"
  | "myfreeinfiltrators"
  | "oppfrozenguardedthreat"
  | "oppfrozenfreethreat"
  | "oppmoverguardedthreat"
  | "oppmoverfreethreat"
  | "oppfrozeninfiltrators"
  | "oppfreeinfiltrators";

export type KriegAiGrid = never;

export type KriegAiArtifactLayer =
  | "myfrozenguardedthreat"
  | "myfrozenfreethreat"
  | "mymoverguardedthreat"
  | "mymoverfreethreat"
  | "oppfrozenguardedthreat"
  | "oppfrozenfreethreat"
  | "oppmoverguardedthreat"
  | "oppmoverfreethreat";

export type KriegAiBrain = "Fred";

export type KriegAiTerrainLayer = never;

export type KriegAiTerrain = never;

export type KriegPosition =
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
