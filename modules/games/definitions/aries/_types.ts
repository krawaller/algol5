import { CommonLayer, Generators, Flow, AlgolBoard, AI, Graphics, Instructions, AlgolMeta, Setup, GameTestSuite, FullDef } from '../../../types';

export type AriesBoardHeight = 8;
export type AriesBoardWidth = 8;

export type AriesTerrain = "corner";
export type AriesUnit = "soldiers";
export type AriesMark = "selectunit" | "selectmovetarget";
export type AriesCommand = "move";
export type AriesPhaseCommand = never;
export type AriesPhase = "startTurn" | AriesMark;
export type AriesUnitLayer = "units" | "myunits" | "oppunits";
export type AriesGenerator = "findmovetargets" | "findpushresults";
export type AriesArtifactLayer = "movetargets" | "beingpushed" | "squished";
export type AriesTerrainLayer = "corner" | "mycorner" | "oppcorner" | "nocorner";
export type AriesLayer = CommonLayer | AriesUnitLayer | AriesArtifactLayer | AriesTerrainLayer;
export type AriesBattlePos = any;
export type AriesBattleVar = any;
export type AriesTurnPos = any;
export type AriesTurnVar = any;
 
export type AriesGenerators = Generators<AriesArtifactLayer, AriesBattlePos, AriesBattleVar, AriesCommand, AriesGenerator, AriesGrid, AriesLayer, AriesMark, AriesTurnPos, AriesTurnVar>;
export type AriesFlow = Flow<AriesBattlePos, AriesBattleVar, AriesCommand, AriesGenerator, AriesGrid, AriesLayer, AriesMark, AriesTurnPos, AriesTurnVar, AriesUnit>;
export type AriesBoard = AlgolBoard<AriesBoardHeight, AriesBoardWidth, AriesGrid, AriesPosition, AriesTerrain>;
export type AriesAI = AI<AriesAiArtifactLayer, AriesAiAspect, AriesAiBrain, AriesAiGenerator, AriesAiGrid, AriesAiTerrain, AriesAiTerrainLayer, AriesBattlePos, AriesBattleVar, AriesBoardHeight, AriesBoardWidth, AriesCommand, AriesGrid, AriesLayer, AriesMark, AriesPosition, AriesTurnPos, AriesTurnVar>;
export type AriesGraphics = Graphics<AriesTerrain, AriesUnit>;
export type AriesInstructions = Instructions<AriesBattlePos, AriesBattleVar, AriesCommand, AriesGrid, AriesLayer, AriesMark, AriesPhase, AriesTurnPos, AriesTurnVar, AriesUnit>;
export type AriesMeta = AlgolMeta<AriesCommand, AriesMark>;
export type AriesScripts = GameTestSuite;
export type AriesSetup = Setup<AriesPosition, AriesUnit>;

export type AriesDefinition = FullDef<AriesAiArtifactLayer, AriesAiAspect, AriesAiBrain, AriesAiGenerator, AriesAiGrid, AriesAiTerrain, AriesAiTerrainLayer, AriesArtifactLayer, AriesBattlePos, AriesBattleVar, AriesBoardHeight, AriesBoardWidth, AriesCommand, AriesGenerator, AriesGrid, AriesLayer, AriesMark, AriesPhase, AriesPosition, AriesTerrain, AriesTurnPos, AriesTurnVar, AriesUnit>;

export type AriesGrid = never;

export type AriesAiGenerator = never;

export type AriesAiAspect = never;

export type AriesAiGrid = never;

export type AriesAiArtifactLayer = never;

export type AriesAiBrain = never;

export type AriesAiTerrainLayer = never;

export type AriesAiTerrain = never;

export type AriesPosition = "a1" | "a2" | "a3" | "a4" | "a5" | "a6" | "a7" | "a8" | "b1" | "b2" | "b3" | "b4" | "b5" | "b6" | "b7" | "b8" | "c1" | "c2" | "c3" | "c4" | "c5" | "c6" | "c7" | "c8" | "d1" | "d2" | "d3" | "d4" | "d5" | "d6" | "d7" | "d8" | "e1" | "e2" | "e3" | "e4" | "e5" | "e6" | "e7" | "e8" | "f1" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "f8" | "g1" | "g2" | "g3" | "g4" | "g5" | "g6" | "g7" | "g8" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h7" | "h8";
