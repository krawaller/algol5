import { CommonLayer, Generators, Flow, Board, AI, Graphics, Instructions, Meta, Setup, GameTestSuite, FullDef } from '../../../types';

export type AriesTerrain = "corner";
export type AriesUnit = "soldiers";
export type AriesMark = "selectunit" | "selectmovetarget";
export type AriesCommand = "move";
export type AriesPhaseCommand = never;
export type AriesPhase = "startTurn" | AriesMark;
export type AriesUnitLayer = "soldiers" | "mysoldiers" | "neutralsoldiers" | "oppsoldiers";
export type AriesGenerator = "findmovetargets" | "findpushresults";
export type AriesArtifactLayer = "movetargets" | "beingpushed" | "squished";
export type AriesTerrainLayer = "corner" | "nocorner" | "mycorner" | "oppcorner";
export type AriesLayer = CommonLayer | AriesUnitLayer | AriesArtifactLayer | AriesTerrainLayer;
export type AriesBattlePos = any;
export type AriesBattleVar = any;
export type AriesTurnPos = any;
export type AriesTurnVar = any;
 
export type AriesGenerators = Generators<AriesArtifactLayer, AriesBattlePos, AriesBattleVar, AriesCommand, AriesGenerator, AriesGrid, AriesLayer, AriesMark, AriesTurnPos, AriesTurnVar>;
export type AriesFlow = Flow<AriesBattlePos, AriesBattleVar, AriesCommand, AriesGenerator, AriesGrid, AriesLayer, AriesMark, AriesTurnPos, AriesTurnVar, AriesUnit>;
export type AriesBoard = Board<AriesTerrain>;
export type AriesAI = AI<AriesAiArtifactLayer, AriesAiAspect, AriesAiBrain, AriesAiGenerator, AriesAiGrid, AriesAiTerrain, AriesAiTerrainLayer, AriesBattlePos, AriesBattleVar, AriesCommand, AriesGrid, AriesLayer, AriesMark, AriesTurnPos, AriesTurnVar>;
export type AriesGraphics = Graphics<AriesTerrain, AriesUnit>;
export type AriesInstructions = Instructions<AriesBattlePos, AriesBattleVar, AriesCommand, AriesGrid, AriesLayer, AriesMark, AriesPhase, AriesTurnPos, AriesTurnVar, AriesUnit>;
export type AriesMeta = Meta;
export type AriesScripts = GameTestSuite;
export type AriesSetup = Setup<AriesUnit>;

export type AriesDefinition = FullDef<AriesAiArtifactLayer, AriesAiAspect, AriesAiBrain, AriesAiGenerator, AriesAiGrid, AriesAiTerrain, AriesAiTerrainLayer, AriesArtifactLayer, AriesBattlePos, AriesBattleVar, AriesCommand, AriesGenerator, AriesGrid, AriesLayer, AriesMark, AriesPhase, AriesTerrain, AriesTurnPos, AriesTurnVar, AriesUnit>;

export type AriesGrid = never;

export type AriesAiGenerator = never;

export type AriesAiAspect = never;

export type AriesAiGrid = never;

export type AriesAiArtifactLayer = never;

export type AriesAiBrain = never;

export type AriesAiTerrainLayer = never;

export type AriesAiTerrain = never;
