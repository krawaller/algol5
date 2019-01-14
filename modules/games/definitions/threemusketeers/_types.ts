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
export type ThreemusketeersFlow = Flow<ThreemusketeersArtifactLayer, ThreemusketeersCommand, ThreemusketeersGenerator, ThreemusketeersLayer, ThreemusketeersMark, ThreemusketeersUnit>;
export type ThreemusketeersBoard = Board<ThreemusketeersTerrain>;
export type ThreemusketeersAI = AI;
export type ThreemusketeersGraphics = Graphics<ThreemusketeersTerrain, ThreemusketeersUnit>;
export type ThreemusketeersInstructions = Instructions<ThreemusketeersPhase>;
export type ThreemusketeersMeta = Meta;
export type ThreemusketeersScripts = GameTestSuite;
export type ThreemusketeersSetup = Setup<ThreemusketeersUnit>;

export type ThreemusketeersDefinition = FullDef<ThreemusketeersArtifactLayer, ThreemusketeersBattlePos, ThreemusketeersBattleVar, ThreemusketeersCommand, ThreemusketeersGenerator, ThreemusketeersLayer, ThreemusketeersMark, ThreemusketeersPhase, ThreemusketeersTerrain, ThreemusketeersTurnPos, ThreemusketeersTurnVar, ThreemusketeersUnit>;
