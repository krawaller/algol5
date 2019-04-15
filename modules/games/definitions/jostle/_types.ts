import { CommonLayer, Generators, Flow, AlgolBoard, AI, Graphics, Instructions, AlgolMeta, Setup, GameTestSuite, FullDef } from '../../../types';

export type JostleBoardHeight = 10;
export type JostleBoardWidth = 10;

export type JostleTerrain = never;
export type JostleUnit = "checkers";
export type JostleMark = "selectunit" | "selectmovetarget";
export type JostleCommand = "jostle";
export type JostlePhaseCommand = never;
export type JostlePhase = "startTurn" | JostleMark;
export type JostleUnitLayer = "units" | "myunits" | "oppunits" | "mycheckers" | "oppcheckers";
export type JostleGenerator = "findinitial" | "findnew";
export type JostleArtifactLayer = "movetargets" | "initialenemy" | "initialfriend" | "newenemy" | "newfriend";
export type JostleTerrainLayer = never;
export type JostleLayer = CommonLayer | JostleUnitLayer | JostleArtifactLayer;
export type JostleBattlePos = any;
export type JostleBattleVar = any;
export type JostleTurnPos = any;
export type JostleTurnVar = any;
 
export type JostleGenerators = Generators<JostleArtifactLayer, JostleBattlePos, JostleBattleVar, JostleCommand, JostleGenerator, JostleGrid, JostleLayer, JostleMark, JostleTurnPos, JostleTurnVar>;
export type JostleFlow = Flow<JostleBattlePos, JostleBattleVar, JostleCommand, JostleGenerator, JostleGrid, JostleLayer, JostleMark, JostleTurnPos, JostleTurnVar, JostleUnit>;
export type JostleBoard = AlgolBoard<JostleBoardHeight, JostleBoardWidth, JostleGrid, JostlePosition, JostleTerrain>;
export type JostleAI = AI<JostleAiArtifactLayer, JostleAiAspect, JostleAiBrain, JostleAiGenerator, JostleAiGrid, JostleAiTerrain, JostleAiTerrainLayer, JostleBattlePos, JostleBattleVar, JostleBoardHeight, JostleBoardWidth, JostleCommand, JostleGrid, JostleLayer, JostleMark, JostlePosition, JostleTurnPos, JostleTurnVar>;
export type JostleGraphics = Graphics<JostleTerrain, JostleUnit>;
export type JostleInstructions = Instructions<JostleBattlePos, JostleBattleVar, JostleCommand, JostleGrid, JostleLayer, JostleMark, JostlePhase, JostleTurnPos, JostleTurnVar, JostleUnit>;
export type JostleMeta = AlgolMeta<JostleCommand, JostleMark>;
export type JostleScripts = GameTestSuite;
export type JostleSetup = Setup<JostlePosition, JostleUnit>;

export type JostleDefinition = FullDef<JostleAiArtifactLayer, JostleAiAspect, JostleAiBrain, JostleAiGenerator, JostleAiGrid, JostleAiTerrain, JostleAiTerrainLayer, JostleArtifactLayer, JostleBattlePos, JostleBattleVar, JostleBoardHeight, JostleBoardWidth, JostleCommand, JostleGenerator, JostleGrid, JostleLayer, JostleMark, JostlePhase, JostlePosition, JostleTerrain, JostleTurnPos, JostleTurnVar, JostleUnit>;

export type JostleGrid = never;

export type JostleAiGenerator = never;

export type JostleAiAspect = never;

export type JostleAiGrid = never;

export type JostleAiArtifactLayer = never;

export type JostleAiBrain = never;

export type JostleAiTerrainLayer = never;

export type JostleAiTerrain = never;

export type JostlePosition = "a1" | "a10" | "a2" | "a3" | "a4" | "a5" | "a6" | "a7" | "a8" | "a9" | "b1" | "b10" | "b2" | "b3" | "b4" | "b5" | "b6" | "b7" | "b8" | "b9" | "c1" | "c10" | "c2" | "c3" | "c4" | "c5" | "c6" | "c7" | "c8" | "c9" | "d1" | "d10" | "d2" | "d3" | "d4" | "d5" | "d6" | "d7" | "d8" | "d9" | "e1" | "e10" | "e2" | "e3" | "e4" | "e5" | "e6" | "e7" | "e8" | "e9" | "f1" | "f10" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "f8" | "f9" | "g1" | "g10" | "g2" | "g3" | "g4" | "g5" | "g6" | "g7" | "g8" | "g9" | "h1" | "h10" | "h2" | "h3" | "h4" | "h5" | "h6" | "h7" | "h8" | "h9" | "i1" | "i10" | "i2" | "i3" | "i4" | "i5" | "i6" | "i7" | "i8" | "i9" | "j1" | "j10" | "j2" | "j3" | "j4" | "j5" | "j6" | "j7" | "j8" | "j9";
