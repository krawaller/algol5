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
 
export type TransetGenerators = Generators<TransetArtifactLayer, TransetGenerator, TransetLayer>;
export type TransetFlow = Flow<TransetArtifactLayer, TransetCommand, TransetGenerator, TransetLayer, TransetMark, TransetUnit>;
export type TransetBoard = Board<TransetTerrain>;
export type TransetAI = AI;
export type TransetGraphics = Graphics<TransetTerrain, TransetUnit>;
export type TransetInstructions = Instructions<TransetPhase>;
export type TransetMeta = Meta;
export type TransetScripts = GameTestSuite;
export type TransetSetup = Setup<TransetUnit>;

export type TransetDefinition = FullDef<TransetLayer, TransetMark, TransetCommand, TransetTurnPos, TransetTurnVar, TransetBattlePos, TransetBattleVar, TransetArtifactLayer, TransetGenerator, TransetPhase, TransetTerrain, TransetUnit>;
