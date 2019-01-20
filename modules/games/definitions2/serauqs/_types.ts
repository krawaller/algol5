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
 
export type SerauqsGenerators = Generators<SerauqsArtifactLayer, SerauqsBattlePos, SerauqsBattleVar, SerauqsCommand, SerauqsGenerator, SerauqsLayer, SerauqsMark, SerauqsTurnPos, SerauqsTurnVar>;
export type SerauqsFlow = Flow<SerauqsBattlePos, SerauqsBattleVar, SerauqsCommand, SerauqsGenerator, SerauqsLayer, SerauqsMark, SerauqsTurnPos, SerauqsTurnVar, SerauqsUnit>;
export type SerauqsBoard = Board<SerauqsTerrain>;
export type SerauqsAI = AI<SerauqsAiArtifactLayer, SerauqsAiAspect, SerauqsAiBrain, SerauqsAiGenerator, SerauqsAiGrid, SerauqsAiTerrain, SerauqsAiTerrainLayer, SerauqsBattlePos, SerauqsBattleVar, SerauqsCommand, SerauqsLayer, SerauqsMark, SerauqsTurnPos, SerauqsTurnVar>;
export type SerauqsGraphics = Graphics<SerauqsTerrain, SerauqsUnit>;
export type SerauqsInstructions = Instructions<SerauqsBattlePos, SerauqsBattleVar, SerauqsCommand, SerauqsLayer, SerauqsMark, SerauqsPhase, SerauqsTurnPos, SerauqsTurnVar, SerauqsUnit>;
export type SerauqsMeta = Meta;
export type SerauqsScripts = GameTestSuite;
export type SerauqsSetup = Setup<SerauqsUnit>;

export type SerauqsDefinition = FullDef<SerauqsAiArtifactLayer, SerauqsAiAspect, SerauqsAiBrain, SerauqsAiGenerator, SerauqsAiGrid, SerauqsAiTerrain, SerauqsAiTerrainLayer, SerauqsArtifactLayer, SerauqsBattlePos, SerauqsBattleVar, SerauqsCommand, SerauqsGenerator, SerauqsLayer, SerauqsMark, SerauqsPhase, SerauqsTerrain, SerauqsTurnPos, SerauqsTurnVar, SerauqsUnit>;

export type SerauqsAiGenerator = never;

export type SerauqsAiAspect = never;

export type SerauqsAiGrid = never;

export type SerauqsAiArtifactLayer = never;

export type SerauqsAiBrain = never;

export type SerauqsAiTerrainLayer = never;

export type SerauqsAiTerrain = never;
