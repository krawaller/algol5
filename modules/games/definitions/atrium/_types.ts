import { CommonLayer, Generators, Flow, AlgolBoard, AI, AlgolAnim, Graphics, Instructions, AlgolMeta, Setup, GameTestSuite, FullDef, AlgolPerformance } from '../../../types';

export type AtriumBoardHeight = 5;
export type AtriumBoardWidth = 5;

export type AtriumAnim = AlgolAnim<AtriumBattlePos, AtriumBattleVar, AtriumCommand, AtriumGrid, AtriumLayer, AtriumMark, AtriumTurnPos, AtriumTurnVar, AtriumUnit>;

export type AtriumTerrain = never;
export type AtriumUnit = "kings" | "queens";
export type AtriumMark = "selectunit" | "selectmovetarget";
export type AtriumCommand = "move";
export type AtriumPhaseCommand = never;
export type AtriumPhase = "startTurn" | AtriumMark;
export type AtriumUnitLayer = "units" | "myunits" | "oppunits" | "mykings" | "oppkings" | "myqueens" | "oppqueens";
export type AtriumGenerator = "findmovetargets" | "findwinlines";
export type AtriumArtifactLayer = "movetargets" | "winline";
export type AtriumTerrainLayer = never;
export type AtriumLayer = CommonLayer | AtriumUnitLayer | AtriumArtifactLayer;
export type AtriumBattlePos = any;
export type AtriumBattleVar = any;
export type AtriumTurnPos = any;
export type AtriumTurnVar = any;
 
export type AtriumGenerators = Generators<AtriumArtifactLayer, AtriumBattlePos, AtriumBattleVar, AtriumCommand, AtriumGenerator, AtriumGrid, AtriumLayer, AtriumMark, AtriumTurnPos, AtriumTurnVar>;
export type AtriumFlow = Flow<AtriumBattlePos, AtriumBattleVar, AtriumCommand, AtriumGenerator, AtriumGrid, AtriumLayer, AtriumMark, AtriumTurnPos, AtriumTurnVar, AtriumUnit>;
export type AtriumBoard = AlgolBoard<AtriumBoardHeight, AtriumBoardWidth, AtriumGrid, AtriumPosition, AtriumTerrain>;
export type AtriumAI = AI<AtriumAiArtifactLayer, AtriumAiAspect, AtriumAiBrain, AtriumAiGenerator, AtriumAiGrid, AtriumAiTerrain, AtriumAiTerrainLayer, AtriumBattlePos, AtriumBattleVar, AtriumBoardHeight, AtriumBoardWidth, AtriumCommand, AtriumGrid, AtriumLayer, AtriumMark, AtriumPosition, AtriumTurnPos, AtriumTurnVar>;
export type AtriumGraphics = Graphics<AtriumTerrain, AtriumUnit>;
export type AtriumInstructions = Instructions<AtriumBattlePos, AtriumBattleVar, AtriumCommand, AtriumGrid, AtriumLayer, AtriumMark, AtriumPhase, AtriumTurnPos, AtriumTurnVar, AtriumUnit>;
export type AtriumMeta = AlgolMeta<AtriumCommand, AtriumMark>;
export type AtriumPerformance = AlgolPerformance<AtriumCommand, AtriumMark>;
export type AtriumScripts = GameTestSuite;
export type AtriumSetup = Setup<AtriumPosition, AtriumUnit>;

export type AtriumDefinition = FullDef<AtriumAiArtifactLayer, AtriumAiAspect, AtriumAiBrain, AtriumAiGenerator, AtriumAiGrid, AtriumAiTerrain, AtriumAiTerrainLayer, AtriumArtifactLayer, AtriumBattlePos, AtriumBattleVar, AtriumBoardHeight, AtriumBoardWidth, AtriumCommand, AtriumGenerator, AtriumGrid, AtriumLayer, AtriumMark, AtriumPhase, AtriumPosition, AtriumTerrain, AtriumTurnPos, AtriumTurnVar, AtriumUnit>;

export type AtriumGrid = never;

export type AtriumAiGenerator = never;

export type AtriumAiAspect = never;

export type AtriumAiGrid = never;

export type AtriumAiArtifactLayer = never;

export type AtriumAiBrain = never;

export type AtriumAiTerrainLayer = never;

export type AtriumAiTerrain = never;

export type AtriumPosition = "a1" | "a2" | "a3" | "a4" | "a5" | "b1" | "b2" | "b3" | "b4" | "b5" | "c1" | "c2" | "c3" | "c4" | "c5" | "d1" | "d2" | "d3" | "d4" | "d5" | "e1" | "e2" | "e3" | "e4" | "e5";
