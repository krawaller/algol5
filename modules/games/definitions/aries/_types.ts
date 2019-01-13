import { CommonLayer, Generators, Flow, Board, AI, Graphics, Instructions, Meta, Setup, GameTestSuite } from '../../../types';

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
 
export type AriesGenerators = Generators<AriesArtifactLayer, AriesGenerator, AriesLayer>;
export type AriesFlow = Flow<AriesArtifactLayer, AriesCommand, AriesGenerator, AriesLayer, AriesMark, AriesUnit>;
export type AriesBoard = Board<AriesTerrain>;
export type AriesAI = AI;
export type AriesGraphics = Graphics<AriesTerrain, AriesUnit>;
export type AriesInstructions = Instructions<AriesPhase>;
export type AriesMeta = Meta;
export type AriesScripts = GameTestSuite;
export type AriesSetup = Setup<AriesUnit>;
