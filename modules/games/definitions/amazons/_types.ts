import { CommonLayer, Generators, Flow, Board, AI, Graphics, Instructions, Meta, Setup, GameTestSuite } from '../../../types';

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
 
export type AmazonsGenerators = Generators<AmazonsArtifactLayer, AmazonsGenerator, AmazonsLayer>;
export type AmazonsFlow = Flow<AmazonsArtifactLayer, AmazonsCommand, AmazonsGenerator, AmazonsLayer, AmazonsMark, AmazonsUnit>;
export type AmazonsBoard = Board<AmazonsTerrain>;
export type AmazonsAI = AI;
export type AmazonsGraphics = Graphics<AmazonsTerrain, AmazonsUnit>;
export type AmazonsInstructions = Instructions<AmazonsPhase>;
export type AmazonsMeta = Meta;
export type AmazonsScripts = GameTestSuite;
export type AmazonsSetup = Setup<AmazonsUnit>;
