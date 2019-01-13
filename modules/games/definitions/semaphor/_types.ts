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
 
export type SemaphorGenerators = Generators<SemaphorArtifactLayer, SemaphorGenerator, SemaphorLayer>;
export type SemaphorFlow = Flow<SemaphorArtifactLayer, SemaphorCommand, SemaphorGenerator, SemaphorLayer, SemaphorMark, SemaphorUnit>;
export type SemaphorBoard = Board<SemaphorTerrain>;
export type SemaphorAI = AI;
export type SemaphorGraphics = Graphics<SemaphorTerrain, SemaphorUnit>;
export type SemaphorInstructions = Instructions<SemaphorPhase>;
export type SemaphorMeta = Meta;
export type SemaphorScripts = GameTestSuite;
export type SemaphorSetup = Setup<SemaphorUnit>;

export type SemaphorDefinition = FullDef<SemaphorLayer, SemaphorMark, SemaphorCommand, SemaphorTurnPos, SemaphorTurnVar, SemaphorBattlePos, SemaphorBattleVar, SemaphorArtifactLayer, SemaphorGenerator, SemaphorPhase, SemaphorTerrain, SemaphorUnit>;
