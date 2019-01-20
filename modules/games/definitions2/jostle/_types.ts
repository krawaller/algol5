import { CommonLayer, Generators, Flow, Board, AI, Graphics, Instructions, Meta, Setup, GameTestSuite, FullDef } from '../../../types';

export type JostleTerrain = never;
export type JostleUnit = "checkers";
export type JostleMark = "selectunit" | "selectmovetarget";
export type JostleCommand = "jostle";
export type JostlePhaseCommand = never;
export type JostlePhase = "startTurn" | JostleMark;
export type JostleUnitLayer = "checkers" | "mycheckers" | "neutralcheckers" | "oppcheckers";
export type JostleGenerator = "findinitial" | "findnew";
export type JostleArtifactLayer = "movetargets" | "initialenemy" | "initialfriend" | "newenemy" | "newfriend";
export type JostleTerrainLayer = never;
export type JostleLayer = CommonLayer | JostleUnitLayer | JostleArtifactLayer;
export type JostleBattlePos = any;
export type JostleBattleVar = any;
export type JostleTurnPos = any;
export type JostleTurnVar = any;
 
export type JostleGenerators = Generators<JostleArtifactLayer, JostleBattlePos, JostleBattleVar, JostleCommand, JostleGenerator, JostleLayer, JostleMark, JostleTurnPos, JostleTurnVar>;
export type JostleFlow = Flow<JostleBattlePos, JostleBattleVar, JostleCommand, JostleGenerator, JostleLayer, JostleMark, JostleTurnPos, JostleTurnVar, JostleUnit>;
export type JostleBoard = Board<JostleTerrain>;
export type JostleAI = AI<JostleAiArtifactLayer, JostleAiAspect, JostleAiBrain, JostleAiGenerator, JostleAiGrid, JostleAiTerrain, JostleAiTerrainLayer, JostleBattlePos, JostleBattleVar, JostleCommand, JostleLayer, JostleMark, JostleTurnPos, JostleTurnVar>;
export type JostleGraphics = Graphics<JostleTerrain, JostleUnit>;
export type JostleInstructions = Instructions<JostleBattlePos, JostleBattleVar, JostleCommand, JostleLayer, JostleMark, JostlePhase, JostleTurnPos, JostleTurnVar, JostleUnit>;
export type JostleMeta = Meta;
export type JostleScripts = GameTestSuite;
export type JostleSetup = Setup<JostleUnit>;

export type JostleDefinition = FullDef<JostleAiArtifactLayer, JostleAiAspect, JostleAiBrain, JostleAiGenerator, JostleAiGrid, JostleAiTerrain, JostleAiTerrainLayer, JostleArtifactLayer, JostleBattlePos, JostleBattleVar, JostleCommand, JostleGenerator, JostleLayer, JostleMark, JostlePhase, JostleTerrain, JostleTurnPos, JostleTurnVar, JostleUnit>;

export type JostleAiGenerator = never;

export type JostleAiAspect = never;

export type JostleAiGrid = never;

export type JostleAiArtifactLayer = never;

export type JostleAiBrain = never;

export type JostleAiTerrainLayer = never;

export type JostleAiTerrain = never;
