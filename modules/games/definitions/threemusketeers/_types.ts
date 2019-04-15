import { CommonLayer, Generators, Flow, AlgolBoard, AI, Graphics, Instructions, AlgolMeta, Setup, GameTestSuite, FullDef } from '../../../types';

export type ThreemusketeersBoardHeight = 5;
export type ThreemusketeersBoardWidth = 5;

export type ThreemusketeersTerrain = never;
export type ThreemusketeersUnit = "pawns" | "kings";
export type ThreemusketeersMark = "selectunit" | "selectmovetarget";
export type ThreemusketeersCommand = "move";
export type ThreemusketeersPhaseCommand = never;
export type ThreemusketeersPhase = "startTurn" | ThreemusketeersMark;
export type ThreemusketeersUnitLayer = "units" | "myunits" | "oppunits" | "pawns" | "kings";
export type ThreemusketeersGenerator = "findstrandedmusketeers" | "findmusketeerline" | "findmovetargets";
export type ThreemusketeersArtifactLayer = "strandedmusketeers" | "musketeerline" | "movetargets";
export type ThreemusketeersTerrainLayer = never;
export type ThreemusketeersLayer = CommonLayer | ThreemusketeersUnitLayer | ThreemusketeersArtifactLayer;
export type ThreemusketeersBattlePos = any;
export type ThreemusketeersBattleVar = any;
export type ThreemusketeersTurnPos = any;
export type ThreemusketeersTurnVar = any;
 
export type ThreemusketeersGenerators = Generators<ThreemusketeersArtifactLayer, ThreemusketeersBattlePos, ThreemusketeersBattleVar, ThreemusketeersCommand, ThreemusketeersGenerator, ThreemusketeersGrid, ThreemusketeersLayer, ThreemusketeersMark, ThreemusketeersTurnPos, ThreemusketeersTurnVar>;
export type ThreemusketeersFlow = Flow<ThreemusketeersBattlePos, ThreemusketeersBattleVar, ThreemusketeersCommand, ThreemusketeersGenerator, ThreemusketeersGrid, ThreemusketeersLayer, ThreemusketeersMark, ThreemusketeersTurnPos, ThreemusketeersTurnVar, ThreemusketeersUnit>;
export type ThreemusketeersBoard = AlgolBoard<ThreemusketeersBoardHeight, ThreemusketeersBoardWidth, ThreemusketeersGrid, ThreemusketeersPosition, ThreemusketeersTerrain>;
export type ThreemusketeersAI = AI<ThreemusketeersAiArtifactLayer, ThreemusketeersAiAspect, ThreemusketeersAiBrain, ThreemusketeersAiGenerator, ThreemusketeersAiGrid, ThreemusketeersAiTerrain, ThreemusketeersAiTerrainLayer, ThreemusketeersBattlePos, ThreemusketeersBattleVar, ThreemusketeersBoardHeight, ThreemusketeersBoardWidth, ThreemusketeersCommand, ThreemusketeersGrid, ThreemusketeersLayer, ThreemusketeersMark, ThreemusketeersPosition, ThreemusketeersTurnPos, ThreemusketeersTurnVar>;
export type ThreemusketeersGraphics = Graphics<ThreemusketeersTerrain, ThreemusketeersUnit>;
export type ThreemusketeersInstructions = Instructions<ThreemusketeersBattlePos, ThreemusketeersBattleVar, ThreemusketeersCommand, ThreemusketeersGrid, ThreemusketeersLayer, ThreemusketeersMark, ThreemusketeersPhase, ThreemusketeersTurnPos, ThreemusketeersTurnVar, ThreemusketeersUnit>;
export type ThreemusketeersMeta = AlgolMeta<ThreemusketeersCommand, ThreemusketeersMark>;
export type ThreemusketeersScripts = GameTestSuite;
export type ThreemusketeersSetup = Setup<ThreemusketeersPosition, ThreemusketeersUnit>;

export type ThreemusketeersDefinition = FullDef<ThreemusketeersAiArtifactLayer, ThreemusketeersAiAspect, ThreemusketeersAiBrain, ThreemusketeersAiGenerator, ThreemusketeersAiGrid, ThreemusketeersAiTerrain, ThreemusketeersAiTerrainLayer, ThreemusketeersArtifactLayer, ThreemusketeersBattlePos, ThreemusketeersBattleVar, ThreemusketeersBoardHeight, ThreemusketeersBoardWidth, ThreemusketeersCommand, ThreemusketeersGenerator, ThreemusketeersGrid, ThreemusketeersLayer, ThreemusketeersMark, ThreemusketeersPhase, ThreemusketeersPosition, ThreemusketeersTerrain, ThreemusketeersTurnPos, ThreemusketeersTurnVar, ThreemusketeersUnit>;

export type ThreemusketeersGrid = never;

export type ThreemusketeersAiGenerator = never;

export type ThreemusketeersAiAspect = never;

export type ThreemusketeersAiGrid = never;

export type ThreemusketeersAiArtifactLayer = never;

export type ThreemusketeersAiBrain = never;

export type ThreemusketeersAiTerrainLayer = never;

export type ThreemusketeersAiTerrain = never;

export type ThreemusketeersPosition = "a1" | "a2" | "a3" | "a4" | "a5" | "b1" | "b2" | "b3" | "b4" | "b5" | "c1" | "c2" | "c3" | "c4" | "c5" | "d1" | "d2" | "d3" | "d4" | "d5" | "e1" | "e2" | "e3" | "e4" | "e5";
