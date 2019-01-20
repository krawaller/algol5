import { CommonLayer, Generators, Flow, Board, AI, Graphics, Instructions, Meta, Setup, GameTestSuite, FullDef } from '../../../types';

export type ThreemusketeersTerrain = never;
export type ThreemusketeersUnit = "pawns" | "kings";
export type ThreemusketeersMark = "selectunit" | "selectmovetarget";
export type ThreemusketeersCommand = "move";
export type ThreemusketeersPhaseCommand = never;
export type ThreemusketeersPhase = "startTurn" | ThreemusketeersMark;
export type ThreemusketeersUnitLayer = "pawns" | "mypawns" | "neutralpawns" | "opppawns" | "kings" | "mykings" | "neutralkings" | "oppkings";
export type ThreemusketeersGenerator = "findstrandedmusketeers" | "findmusketeerline" | "findmovetargets";
export type ThreemusketeersArtifactLayer = "strandedmusketeers" | "musketeerline" | "movetargets";
export type ThreemusketeersTerrainLayer = never;
export type ThreemusketeersLayer = CommonLayer | ThreemusketeersUnitLayer | ThreemusketeersArtifactLayer;
export type ThreemusketeersBattlePos = any;
export type ThreemusketeersBattleVar = any;
export type ThreemusketeersTurnPos = any;
export type ThreemusketeersTurnVar = any;
 
export type ThreemusketeersGenerators = Generators<ThreemusketeersArtifactLayer, ThreemusketeersBattlePos, ThreemusketeersBattleVar, ThreemusketeersCommand, ThreemusketeersGenerator, ThreemusketeersLayer, ThreemusketeersMark, ThreemusketeersTurnPos, ThreemusketeersTurnVar>;
export type ThreemusketeersFlow = Flow<ThreemusketeersBattlePos, ThreemusketeersBattleVar, ThreemusketeersCommand, ThreemusketeersGenerator, ThreemusketeersLayer, ThreemusketeersMark, ThreemusketeersTurnPos, ThreemusketeersTurnVar, ThreemusketeersUnit>;
export type ThreemusketeersBoard = Board<ThreemusketeersTerrain>;
export type ThreemusketeersAI = AI<ThreemusketeersAiArtifactLayer, ThreemusketeersAiAspect, ThreemusketeersAiBrain, ThreemusketeersAiGenerator, ThreemusketeersAiGrid, ThreemusketeersAiTerrain, ThreemusketeersAiTerrainLayer, ThreemusketeersBattlePos, ThreemusketeersBattleVar, ThreemusketeersCommand, ThreemusketeersLayer, ThreemusketeersMark, ThreemusketeersTurnPos, ThreemusketeersTurnVar>;
export type ThreemusketeersGraphics = Graphics<ThreemusketeersTerrain, ThreemusketeersUnit>;
export type ThreemusketeersInstructions = Instructions<ThreemusketeersBattlePos, ThreemusketeersBattleVar, ThreemusketeersCommand, ThreemusketeersLayer, ThreemusketeersMark, ThreemusketeersPhase, ThreemusketeersTurnPos, ThreemusketeersTurnVar, ThreemusketeersUnit>;
export type ThreemusketeersMeta = Meta;
export type ThreemusketeersScripts = GameTestSuite;
export type ThreemusketeersSetup = Setup<ThreemusketeersUnit>;

export type ThreemusketeersDefinition = FullDef<ThreemusketeersAiArtifactLayer, ThreemusketeersAiAspect, ThreemusketeersAiBrain, ThreemusketeersAiGenerator, ThreemusketeersAiGrid, ThreemusketeersAiTerrain, ThreemusketeersAiTerrainLayer, ThreemusketeersArtifactLayer, ThreemusketeersBattlePos, ThreemusketeersBattleVar, ThreemusketeersCommand, ThreemusketeersGenerator, ThreemusketeersLayer, ThreemusketeersMark, ThreemusketeersPhase, ThreemusketeersTerrain, ThreemusketeersTurnPos, ThreemusketeersTurnVar, ThreemusketeersUnit>;

export type ThreemusketeersAiGenerator = never;

export type ThreemusketeersAiAspect = never;

export type ThreemusketeersAiGrid = never;

export type ThreemusketeersAiArtifactLayer = never;

export type ThreemusketeersAiBrain = never;

export type ThreemusketeersAiTerrainLayer = never;

export type ThreemusketeersAiTerrain = never;
