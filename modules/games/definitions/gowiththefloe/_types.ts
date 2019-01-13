import { CommonLayer, Generators, Flow, Board, AI, Graphics, Instructions, Meta, Setup, GameTestSuite } from '../../../types';

export type GowiththefloeTerrain = "water";
export type GowiththefloeUnit = "seals" | "bears" | "holes";
export type GowiththefloeMark = "selectunit" | "selectmovetarget" | "selecteattarget";
export type GowiththefloeCommand = "move" | "eat";
export type GowiththefloePhaseCommand = never;
export type GowiththefloePhase = "startTurn" | GowiththefloeMark;
export type GowiththefloeUnitLayer = "seals" | "myseals" | "neutralseals" | "oppseals" | "bears" | "mybears" | "neutralbears" | "oppbears" | "holes" | "myholes" | "neutralholes" | "oppholes";
export type GowiththefloeGenerator = "findeattargets" | "findmovetargets" | "findsealsmoves" | "findcracks";
export type GowiththefloeArtifactLayer = "eattargets" | "movetargets" | "canmove" | "cracks";
export type GowiththefloeTerrainLayer = "water" | "nowater";
export type GowiththefloeLayer = CommonLayer | GowiththefloeUnitLayer | GowiththefloeArtifactLayer | GowiththefloeTerrainLayer;
export type GowiththefloeBattlePos = any;
export type GowiththefloeBattleVar = any;
export type GowiththefloeTurnPos = any;
export type GowiththefloeTurnVar = any;
 
export type GowiththefloeGenerators = Generators<GowiththefloeArtifactLayer, GowiththefloeGenerator, GowiththefloeLayer>;
export type GowiththefloeFlow = Flow<GowiththefloeArtifactLayer, GowiththefloeCommand, GowiththefloeGenerator, GowiththefloeLayer, GowiththefloeMark, GowiththefloeUnit>;
export type GowiththefloeBoard = Board<GowiththefloeTerrain>;
export type GowiththefloeAI = AI;
export type GowiththefloeGraphics = Graphics<GowiththefloeTerrain, GowiththefloeUnit>;
export type GowiththefloeInstructions = Instructions<GowiththefloePhase>;
export type GowiththefloeMeta = Meta;
export type GowiththefloeScripts = GameTestSuite;
export type GowiththefloeSetup = Setup<GowiththefloeUnit>;
