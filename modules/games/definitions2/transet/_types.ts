import { CommonLayer, Generators, Flow, Board, AI, Graphics, Instructions, Meta, Setup, GameTestSuite, FullDef } from '../../../types';

export type TransetTerrain = "base";
export type TransetUnit = "pinets" | "piokers" | "piases";
export type TransetMark = "selectunit" | "selectmovetarget" | "selectdeportdestination" | "selectswapunit" | "selectswap1target";
export type TransetCommand = "move" | "swap";
export type TransetPhaseCommand = never;
export type TransetPhase = "startTurn" | TransetMark;
export type TransetUnitLayer = "pinets" | "mypinets" | "neutralpinets" | "opppinets" | "piokers" | "mypiokers" | "neutralpiokers" | "opppiokers" | "piases" | "mypiases" | "neutralpiases" | "opppiases";
export type TransetGenerator = "findswap2step" | "findswap1steps" | "findmovetargets";
export type TransetArtifactLayer = "swap2step" | "swap1steps" | "movetargets";
export type TransetTerrainLayer = "base" | "nobase" | "mybase" | "oppbase";
export type TransetLayer = CommonLayer | TransetUnitLayer | TransetArtifactLayer | TransetTerrainLayer;
export type TransetBattlePos = any;
export type TransetBattleVar = any;
export type TransetTurnPos = any;
export type TransetTurnVar = any;
 
export type TransetGenerators = Generators<TransetArtifactLayer, TransetBattlePos, TransetBattleVar, TransetCommand, TransetGenerator, TransetGrid, TransetLayer, TransetMark, TransetTurnPos, TransetTurnVar>;
export type TransetFlow = Flow<TransetBattlePos, TransetBattleVar, TransetCommand, TransetGenerator, TransetGrid, TransetLayer, TransetMark, TransetTurnPos, TransetTurnVar, TransetUnit>;
export type TransetBoard = Board<TransetTerrain>;
export type TransetAI = AI<TransetAiArtifactLayer, TransetAiAspect, TransetAiBrain, TransetAiGenerator, TransetAiGrid, TransetAiTerrain, TransetAiTerrainLayer, TransetBattlePos, TransetBattleVar, TransetCommand, TransetGrid, TransetLayer, TransetMark, TransetTurnPos, TransetTurnVar>;
export type TransetGraphics = Graphics<TransetTerrain, TransetUnit>;
export type TransetInstructions = Instructions<TransetBattlePos, TransetBattleVar, TransetCommand, TransetGrid, TransetLayer, TransetMark, TransetPhase, TransetTurnPos, TransetTurnVar, TransetUnit>;
export type TransetMeta = Meta;
export type TransetScripts = GameTestSuite;
export type TransetSetup = Setup<TransetUnit>;

export type TransetDefinition = FullDef<TransetAiArtifactLayer, TransetAiAspect, TransetAiBrain, TransetAiGenerator, TransetAiGrid, TransetAiTerrain, TransetAiTerrainLayer, TransetArtifactLayer, TransetBattlePos, TransetBattleVar, TransetCommand, TransetGenerator, TransetGrid, TransetLayer, TransetMark, TransetPhase, TransetTerrain, TransetTurnPos, TransetTurnVar, TransetUnit>;

export type TransetGrid = never;

export type TransetAiGenerator = never;

export type TransetAiAspect = never;

export type TransetAiGrid = never;

export type TransetAiArtifactLayer = never;

export type TransetAiBrain = never;

export type TransetAiTerrainLayer = never;

export type TransetAiTerrain = never;
