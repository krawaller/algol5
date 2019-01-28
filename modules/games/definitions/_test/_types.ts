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
 
export type _testGenerators = Generators<_testArtifactLayer, _testBattlePos, _testBattleVar, _testCommand, _testGenerator, _testGrid, _testLayer, _testMark, _testTurnPos, _testTurnVar>;
export type _testFlow = Flow<_testBattlePos, _testBattleVar, _testCommand, _testGenerator, _testGrid, _testLayer, _testMark, _testTurnPos, _testTurnVar, _testUnit>;
export type _testBoard = Board<_testPosition, _testTerrain>;
export type _testAI = AI<_testAiArtifactLayer, _testAiAspect, _testAiBrain, _testAiGenerator, _testAiGrid, _testAiTerrain, _testAiTerrainLayer, _testBattlePos, _testBattleVar, _testCommand, _testGrid, _testLayer, _testMark, _testPosition, _testTurnPos, _testTurnVar>;
export type _testGraphics = Graphics<_testTerrain, _testUnit>;
export type _testInstructions = Instructions<_testBattlePos, _testBattleVar, _testCommand, _testGrid, _testLayer, _testMark, _testPhase, _testTurnPos, _testTurnVar, _testUnit>;
export type _testMeta = Meta;
export type _testScripts = GameTestSuite;
export type _testSetup = Setup<_testPosition, _testUnit>;

export type _testDefinition = FullDef<_testAiArtifactLayer, _testAiAspect, _testAiBrain, _testAiGenerator, _testAiGrid, _testAiTerrain, _testAiTerrainLayer, _testArtifactLayer, _testBattlePos, _testBattleVar, _testCommand, _testGenerator, _testGrid, _testLayer, _testMark, _testPhase, _testPosition, _testTerrain, _testTurnPos, _testTurnVar, _testUnit>;

export type _testGrid = never;

export type _testAiGenerator = never;

export type _testAiAspect = never;

export type _testAiGrid = never;

export type _testAiArtifactLayer = never;

export type _testAiBrain = never;

export type _testAiTerrainLayer = never;

export type _testAiTerrain = never;

export type _testPosition = "a1" | "a10" | "a2" | "a3" | "a4" | "a5" | "a6" | "a7" | "a8" | "a9" | "b1" | "b10" | "b2" | "b3" | "b4" | "b5" | "b6" | "b7" | "b8" | "b9" | "c1" | "c10" | "c2" | "c3" | "c4" | "c5" | "c6" | "c7" | "c8" | "c9" | "d1" | "d10" | "d2" | "d3" | "d4" | "d5" | "d6" | "d7" | "d8" | "d9" | "e1" | "e10" | "e2" | "e3" | "e4" | "e5" | "e6" | "e7" | "e8" | "e9" | "f1" | "f10" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "f8" | "f9" | "g1" | "g10" | "g2" | "g3" | "g4" | "g5" | "g6" | "g7" | "g8" | "g9" | "h1" | "h10" | "h2" | "h3" | "h4" | "h5" | "h6" | "h7" | "h8" | "h9" | "i1" | "i10" | "i2" | "i3" | "i4" | "i5" | "i6" | "i7" | "i8" | "i9" | "j1" | "j10" | "j2" | "j3" | "j4" | "j5" | "j6" | "j7" | "j8" | "j9";
