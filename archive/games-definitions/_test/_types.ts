import { CommonLayer, Generators, Flow, Board, AI, Graphics, Instructions, Meta, Setup, GameTestSuite, FullDef } from '../../../types';

export type _testTerrain = "steps";
export type _testUnit = "stepsfirsts" | "blocksfirsts" | "defaultfirsts" | "noblocks" | "pawns";
export type _testMark = "selectunit" | "selectmark";
export type _testCommand = never;
export type _testPhaseCommand = never;
export type _testPhase = "startTurn" | _testMark;
export type _testUnitLayer = "stepsfirsts" | "mystepsfirsts" | "neutralstepsfirsts" | "oppstepsfirsts" | "blocksfirsts" | "myblocksfirsts" | "neutralblocksfirsts" | "oppblocksfirsts" | "defaultfirsts" | "mydefaultfirsts" | "neutraldefaultfirsts" | "oppdefaultfirsts" | "noblocks" | "mynoblocks" | "neutralnoblocks" | "oppnoblocks" | "pawns" | "mypawns" | "neutralpawns" | "opppawns";
export type _testGenerator = "stepsfirst" | "blocksfirst" | "defaultfirst" | "noblock";
export type _testArtifactLayer = "marks" | "blocks";
export type _testTerrainLayer = "steps" | "nosteps";
export type _testLayer = CommonLayer | _testUnitLayer | _testArtifactLayer | _testTerrainLayer;
export type _testBattlePos = any;
export type _testBattleVar = any;
export type _testTurnPos = any;
export type _testTurnVar = any;
 
export type _testGenerators = Generators<_testArtifactLayer, _testBattlePos, _testBattleVar, _testCommand, _testGenerator, _testLayer, _testMark, _testTurnPos, _testTurnVar>;
export type _testFlow = Flow<_testArtifactLayer, _testCommand, _testGenerator, _testLayer, _testMark, _testUnit>;
export type _testBoard = Board<_testTerrain>;
export type _testAI = AI;
export type _testGraphics = Graphics<_testTerrain, _testUnit>;
export type _testInstructions = Instructions<_testPhase>;
export type _testMeta = Meta;
export type _testScripts = GameTestSuite;
export type _testSetup = Setup<_testUnit>;

export type _testDefinition = FullDef<_testArtifactLayer, _testBattlePos, _testBattleVar, _testCommand, _testGenerator, _testLayer, _testMark, _testPhase, _testTerrain, _testTurnPos, _testTurnVar, _testUnit>;
