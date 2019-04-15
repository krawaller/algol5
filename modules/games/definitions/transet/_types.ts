import { CommonLayer, Generators, Flow, AlgolBoard, AI, Graphics, Instructions, AlgolMeta, Setup, GameTestSuite, FullDef } from '../../../types';

export type TransetBoardHeight = 5;
export type TransetBoardWidth = 5;

export type TransetTerrain = "base";
export type TransetUnit = "pinets" | "piokers" | "piases";
export type TransetMark = "selectunit" | "selectmovetarget" | "selectdeportdestination" | "selectswapunit" | "selectswap1target";
export type TransetCommand = "move" | "swap";
export type TransetPhaseCommand = never;
export type TransetPhase = "startTurn" | TransetMark;
export type TransetUnitLayer = "units" | "myunits" | "oppunits" | "pinets" | "piokers";
export type TransetGenerator = "findswap2step" | "findswap1steps" | "findmovetargets";
export type TransetArtifactLayer = "swap2step" | "swap1steps" | "movetargets";
export type TransetTerrainLayer = "base" | "mybase" | "oppbase" | "nobase";
export type TransetLayer = CommonLayer | TransetUnitLayer | TransetArtifactLayer | TransetTerrainLayer;
export type TransetBattlePos = any;
export type TransetBattleVar = any;
export type TransetTurnPos = any;
export type TransetTurnVar = any;
 
export type TransetGenerators = Generators<TransetArtifactLayer, TransetBattlePos, TransetBattleVar, TransetCommand, TransetGenerator, TransetGrid, TransetLayer, TransetMark, TransetTurnPos, TransetTurnVar>;
export type TransetFlow = Flow<TransetBattlePos, TransetBattleVar, TransetCommand, TransetGenerator, TransetGrid, TransetLayer, TransetMark, TransetTurnPos, TransetTurnVar, TransetUnit>;
export type TransetBoard = AlgolBoard<TransetBoardHeight, TransetBoardWidth, TransetGrid, TransetPosition, TransetTerrain>;
export type TransetAI = AI<TransetAiArtifactLayer, TransetAiAspect, TransetAiBrain, TransetAiGenerator, TransetAiGrid, TransetAiTerrain, TransetAiTerrainLayer, TransetBattlePos, TransetBattleVar, TransetBoardHeight, TransetBoardWidth, TransetCommand, TransetGrid, TransetLayer, TransetMark, TransetPosition, TransetTurnPos, TransetTurnVar>;
export type TransetGraphics = Graphics<TransetTerrain, TransetUnit>;
export type TransetInstructions = Instructions<TransetBattlePos, TransetBattleVar, TransetCommand, TransetGrid, TransetLayer, TransetMark, TransetPhase, TransetTurnPos, TransetTurnVar, TransetUnit>;
export type TransetMeta = AlgolMeta<TransetCommand, TransetMark>;
export type TransetScripts = GameTestSuite;
export type TransetSetup = Setup<TransetPosition, TransetUnit>;

export type TransetDefinition = FullDef<TransetAiArtifactLayer, TransetAiAspect, TransetAiBrain, TransetAiGenerator, TransetAiGrid, TransetAiTerrain, TransetAiTerrainLayer, TransetArtifactLayer, TransetBattlePos, TransetBattleVar, TransetBoardHeight, TransetBoardWidth, TransetCommand, TransetGenerator, TransetGrid, TransetLayer, TransetMark, TransetPhase, TransetPosition, TransetTerrain, TransetTurnPos, TransetTurnVar, TransetUnit>;

export type TransetGrid = never;

export type TransetAiGenerator = never;

export type TransetAiAspect = never;

export type TransetAiGrid = never;

export type TransetAiArtifactLayer = never;

export type TransetAiBrain = never;

export type TransetAiTerrainLayer = never;

export type TransetAiTerrain = never;

export type TransetPosition = "a1" | "a2" | "a3" | "a4" | "a5" | "b1" | "b2" | "b3" | "b4" | "b5" | "c1" | "c2" | "c3" | "c4" | "c5" | "d1" | "d2" | "d3" | "d4" | "d5" | "e1" | "e2" | "e3" | "e4" | "e5";
