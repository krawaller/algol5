import { CommonLayer, Generators, Flow, Board, AI, Graphics, Instructions, Meta, Setup, GameTestSuite, FullDef } from '../../../types';

export type SerauqsTerrain = "base" | "corners" | "middle";
export type SerauqsUnit = "soldiers" | "wild";
export type SerauqsMark = "selectunit" | "selectmovetarget";
export type SerauqsCommand = "promote" | "move";
export type SerauqsPhaseCommand = never;
export type SerauqsPhase = "startTurn" | SerauqsMark;
export type SerauqsUnitLayer = "soldiers" | "mysoldiers" | "neutralsoldiers" | "oppsoldiers" | "wild" | "mywild" | "neutralwild" | "oppwild";
export type SerauqsGenerator = "findmovetargets" | "findwinline";
export type SerauqsArtifactLayer = "movetargets" | "winline";
export type SerauqsTerrainLayer = "base" | "nobase" | "mybase" | "oppbase" | "corners" | "nocorners" | "middle" | "nomiddle";
export type SerauqsLayer = CommonLayer | SerauqsUnitLayer | SerauqsArtifactLayer | SerauqsTerrainLayer;
export type SerauqsBattlePos = any;
export type SerauqsBattleVar = any;
export type SerauqsTurnPos = any;
export type SerauqsTurnVar = any;
 
export type SerauqsGenerators = Generators<SerauqsLayer, SerauqsMark, SerauqsCommand, SerauqsTurnPos, SerauqsTurnVar, SerauqsBattlePos, SerauqsBattleVar, SerauqsArtifactLayer, SerauqsGenerator>;
export type SerauqsFlow = Flow<SerauqsArtifactLayer, SerauqsCommand, SerauqsGenerator, SerauqsLayer, SerauqsMark, SerauqsUnit>;
export type SerauqsBoard = Board<SerauqsTerrain>;
export type SerauqsAI = AI;
export type SerauqsGraphics = Graphics<SerauqsTerrain, SerauqsUnit>;
export type SerauqsInstructions = Instructions<SerauqsPhase>;
export type SerauqsMeta = Meta;
export type SerauqsScripts = GameTestSuite;
export type SerauqsSetup = Setup<SerauqsUnit>;

export type SerauqsDefinition = FullDef<SerauqsLayer, SerauqsMark, SerauqsCommand, SerauqsTurnPos, SerauqsTurnVar, SerauqsBattlePos, SerauqsBattleVar, SerauqsArtifactLayer, SerauqsGenerator, SerauqsPhase, SerauqsTerrain, SerauqsUnit>;
