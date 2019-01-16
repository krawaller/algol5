import { CommonLayer, Generators, Flow, Board, AI, Graphics, Instructions, Meta, Setup, GameTestSuite, FullDef } from '../../../types';

export type DaggersTerrain = "base";
export type DaggersUnit = "daggers" | "crowns";
export type DaggersMark = "selectunit" | "selectmovetarget";
export type DaggersCommand = "move";
export type DaggersPhaseCommand = never;
export type DaggersPhase = "startTurn" | DaggersMark;
export type DaggersUnitLayer = "daggers" | "mydaggers" | "neutraldaggers" | "oppdaggers" | "crowns" | "mycrowns" | "neutralcrowns" | "oppcrowns";
export type DaggersGenerator = "findcrowntargets" | "finddaggertargets";
export type DaggersArtifactLayer = "movetarget";
export type DaggersTerrainLayer = "base" | "nobase" | "mybase" | "oppbase";
export type DaggersLayer = CommonLayer | DaggersUnitLayer | DaggersArtifactLayer | DaggersTerrainLayer;
export type DaggersBattlePos = any;
export type DaggersBattleVar = any;
export type DaggersTurnPos = any;
export type DaggersTurnVar = any;
 
export type DaggersGenerators = Generators<DaggersArtifactLayer, DaggersBattlePos, DaggersBattleVar, DaggersCommand, DaggersGenerator, DaggersLayer, DaggersMark, DaggersTurnPos, DaggersTurnVar>;
export type DaggersFlow = Flow<DaggersBattlePos, DaggersBattleVar, DaggersCommand, DaggersLayer, DaggersMark, DaggersTurnPos, DaggersTurnVar>;
export type DaggersBoard = Board<DaggersTerrain>;
export type DaggersAI = AI;
export type DaggersGraphics = Graphics<DaggersTerrain, DaggersUnit>;
export type DaggersInstructions = Instructions<DaggersPhase>;
export type DaggersMeta = Meta;
export type DaggersScripts = GameTestSuite;
export type DaggersSetup = Setup<DaggersUnit>;

export type DaggersDefinition = FullDef<DaggersArtifactLayer, DaggersBattlePos, DaggersBattleVar, DaggersCommand, DaggersGenerator, DaggersLayer, DaggersMark, DaggersPhase, DaggersTerrain, DaggersTurnPos, DaggersTurnVar, DaggersUnit>;
