import { CommonLayer, Generators, Flow, Board, AI, Graphics, Instructions, Meta, Setup, GameTestSuite, FullDef } from '../../../types';

export type SemaphorTerrain = never;
export type SemaphorUnit = "kings" | "pawns" | "bishops";
export type SemaphorMark = "selectdeploytarget" | "selectunit";
export type SemaphorCommand = "deploy" | "promote";
export type SemaphorPhaseCommand = never;
export type SemaphorPhase = "startTurn" | SemaphorMark;
export type SemaphorUnitLayer = "kings" | "mykings" | "neutralkings" | "oppkings" | "pawns" | "mypawns" | "neutralpawns" | "opppawns" | "bishops" | "mybishops" | "neutralbishops" | "oppbishops";
export type SemaphorGenerator = "findlines";
export type SemaphorArtifactLayer = "line";
export type SemaphorTerrainLayer = never;
export type SemaphorLayer = CommonLayer | SemaphorUnitLayer | SemaphorArtifactLayer;
export type SemaphorBattlePos = any;
export type SemaphorBattleVar = any;
export type SemaphorTurnPos = any;
export type SemaphorTurnVar = any;
 
export type SemaphorGenerators = Generators<SemaphorArtifactLayer, SemaphorBattlePos, SemaphorBattleVar, SemaphorCommand, SemaphorGenerator, SemaphorGrid, SemaphorLayer, SemaphorMark, SemaphorTurnPos, SemaphorTurnVar>;
export type SemaphorFlow = Flow<SemaphorBattlePos, SemaphorBattleVar, SemaphorCommand, SemaphorGenerator, SemaphorGrid, SemaphorLayer, SemaphorMark, SemaphorTurnPos, SemaphorTurnVar, SemaphorUnit>;
export type SemaphorBoard = Board<SemaphorPosition, SemaphorTerrain>;
export type SemaphorAI = AI<SemaphorAiArtifactLayer, SemaphorAiAspect, SemaphorAiBrain, SemaphorAiGenerator, SemaphorAiGrid, SemaphorAiTerrain, SemaphorAiTerrainLayer, SemaphorBattlePos, SemaphorBattleVar, SemaphorCommand, SemaphorGrid, SemaphorLayer, SemaphorMark, SemaphorTurnPos, SemaphorTurnVar>;
export type SemaphorGraphics = Graphics<SemaphorTerrain, SemaphorUnit>;
export type SemaphorInstructions = Instructions<SemaphorBattlePos, SemaphorBattleVar, SemaphorCommand, SemaphorGrid, SemaphorLayer, SemaphorMark, SemaphorPhase, SemaphorTurnPos, SemaphorTurnVar, SemaphorUnit>;
export type SemaphorMeta = Meta;
export type SemaphorScripts = GameTestSuite;
export type SemaphorSetup = Setup<SemaphorPosition, SemaphorUnit>;

export type SemaphorDefinition = FullDef<SemaphorAiArtifactLayer, SemaphorAiAspect, SemaphorAiBrain, SemaphorAiGenerator, SemaphorAiGrid, SemaphorAiTerrain, SemaphorAiTerrainLayer, SemaphorArtifactLayer, SemaphorBattlePos, SemaphorBattleVar, SemaphorCommand, SemaphorGenerator, SemaphorGrid, SemaphorLayer, SemaphorMark, SemaphorPhase, SemaphorPosition, SemaphorTerrain, SemaphorTurnPos, SemaphorTurnVar, SemaphorUnit>;

export type SemaphorGrid = never;

export type SemaphorAiGenerator = never;

export type SemaphorAiAspect = never;

export type SemaphorAiGrid = never;

export type SemaphorAiArtifactLayer = never;

export type SemaphorAiBrain = never;

export type SemaphorAiTerrainLayer = never;

export type SemaphorAiTerrain = never;

export type SemaphorPosition = "a1" | "a2" | "a3" | "b1" | "b2" | "b3" | "c1" | "c2" | "c3" | "d1" | "d2" | "d3";
