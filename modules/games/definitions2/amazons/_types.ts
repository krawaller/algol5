import { CommonLayer, Generators, Flow, Board, AI, Graphics, Instructions, Meta, Setup, GameTestSuite, FullDef } from '../../../types';

export type AmazonsTerrain = never;
export type AmazonsUnit = "queens" | "fires";
export type AmazonsMark = "selectunit" | "selectmovetarget" | "selectfiretarget";
export type AmazonsCommand = "move" | "fire";
export type AmazonsPhaseCommand = "move";
export type AmazonsPhase = "startTurn" | AmazonsMark | AmazonsPhaseCommand;
export type AmazonsUnitLayer = "queens" | "myqueens" | "neutralqueens" | "oppqueens" | "fires" | "myfires" | "neutralfires" | "oppfires";
export type AmazonsGenerator = "findtargets";
export type AmazonsArtifactLayer = "targets";
export type AmazonsTerrainLayer = never;
export type AmazonsLayer = CommonLayer | AmazonsUnitLayer | AmazonsArtifactLayer;
export type AmazonsBattlePos = any;
export type AmazonsBattleVar = any;
export type AmazonsTurnPos = any;
export type AmazonsTurnVar = any;
 
export type AmazonsGenerators = Generators<AmazonsArtifactLayer, AmazonsBattlePos, AmazonsBattleVar, AmazonsCommand, AmazonsGenerator, AmazonsGrid, AmazonsLayer, AmazonsMark, AmazonsTurnPos, AmazonsTurnVar>;
export type AmazonsFlow = Flow<AmazonsBattlePos, AmazonsBattleVar, AmazonsCommand, AmazonsGenerator, AmazonsGrid, AmazonsLayer, AmazonsMark, AmazonsTurnPos, AmazonsTurnVar, AmazonsUnit>;
export type AmazonsBoard = Board<AmazonsTerrain>;
export type AmazonsAI = AI<AmazonsAiArtifactLayer, AmazonsAiAspect, AmazonsAiBrain, AmazonsAiGenerator, AmazonsAiGrid, AmazonsAiTerrain, AmazonsAiTerrainLayer, AmazonsBattlePos, AmazonsBattleVar, AmazonsCommand, AmazonsGrid, AmazonsLayer, AmazonsMark, AmazonsTurnPos, AmazonsTurnVar>;
export type AmazonsGraphics = Graphics<AmazonsTerrain, AmazonsUnit>;
export type AmazonsInstructions = Instructions<AmazonsBattlePos, AmazonsBattleVar, AmazonsCommand, AmazonsGrid, AmazonsLayer, AmazonsMark, AmazonsPhase, AmazonsTurnPos, AmazonsTurnVar, AmazonsUnit>;
export type AmazonsMeta = Meta;
export type AmazonsScripts = GameTestSuite;
export type AmazonsSetup = Setup<AmazonsUnit>;

export type AmazonsDefinition = FullDef<AmazonsAiArtifactLayer, AmazonsAiAspect, AmazonsAiBrain, AmazonsAiGenerator, AmazonsAiGrid, AmazonsAiTerrain, AmazonsAiTerrainLayer, AmazonsArtifactLayer, AmazonsBattlePos, AmazonsBattleVar, AmazonsCommand, AmazonsGenerator, AmazonsGrid, AmazonsLayer, AmazonsMark, AmazonsPhase, AmazonsTerrain, AmazonsTurnPos, AmazonsTurnVar, AmazonsUnit>;

export type AmazonsGrid = never;

export type AmazonsAiGenerator = "findroads" | "findreach";

export type AmazonsAiAspect = "myroads" | "mydomain" | "opproads" | "oppdomain";

export type AmazonsAiGrid = never;

export type AmazonsAiArtifactLayer = "myroads" | "opproads" | "myreach" | "oppreach";

export type AmazonsAiBrain = "Steve";

export type AmazonsAiTerrainLayer = never;

export type AmazonsAiTerrain = never;
