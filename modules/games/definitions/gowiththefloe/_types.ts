import { CommonLayer, Generators, Flow, AlgolBoard, AI, Graphics, Instructions, AlgolMeta, Setup, GameTestSuite, FullDef } from '../../../types';

export type GowiththefloeBoardHeight = 8;
export type GowiththefloeBoardWidth = 8;

export type GowiththefloeTerrain = "water";
export type GowiththefloeUnit = "seals" | "bears" | "holes";
export type GowiththefloeMark = "selectunit" | "selectmovetarget" | "selecteattarget";
export type GowiththefloeCommand = "move" | "eat";
export type GowiththefloePhaseCommand = never;
export type GowiththefloePhase = "startTurn" | GowiththefloeMark;
export type GowiththefloeUnitLayer = "units" | "myunits" | "oppunits" | "seals" | "bears" | "holes";
export type GowiththefloeGenerator = "findeattargets" | "findmovetargets" | "findsealsmoves" | "findcracks";
export type GowiththefloeArtifactLayer = "eattargets" | "movetargets" | "canmove" | "cracks";
export type GowiththefloeTerrainLayer = "water" | "nowater";
export type GowiththefloeLayer = CommonLayer | GowiththefloeUnitLayer | GowiththefloeArtifactLayer | GowiththefloeTerrainLayer;
export type GowiththefloeBattlePos = any;
export type GowiththefloeBattleVar = any;
export type GowiththefloeTurnPos = any;
export type GowiththefloeTurnVar = any;
 
export type GowiththefloeGenerators = Generators<GowiththefloeArtifactLayer, GowiththefloeBattlePos, GowiththefloeBattleVar, GowiththefloeCommand, GowiththefloeGenerator, GowiththefloeGrid, GowiththefloeLayer, GowiththefloeMark, GowiththefloeTurnPos, GowiththefloeTurnVar>;
export type GowiththefloeFlow = Flow<GowiththefloeBattlePos, GowiththefloeBattleVar, GowiththefloeCommand, GowiththefloeGenerator, GowiththefloeGrid, GowiththefloeLayer, GowiththefloeMark, GowiththefloeTurnPos, GowiththefloeTurnVar, GowiththefloeUnit>;
export type GowiththefloeBoard = AlgolBoard<GowiththefloeBoardHeight, GowiththefloeBoardWidth, GowiththefloeGrid, GowiththefloePosition, GowiththefloeTerrain>;
export type GowiththefloeAI = AI<GowiththefloeAiArtifactLayer, GowiththefloeAiAspect, GowiththefloeAiBrain, GowiththefloeAiGenerator, GowiththefloeAiGrid, GowiththefloeAiTerrain, GowiththefloeAiTerrainLayer, GowiththefloeBattlePos, GowiththefloeBattleVar, GowiththefloeBoardHeight, GowiththefloeBoardWidth, GowiththefloeCommand, GowiththefloeGrid, GowiththefloeLayer, GowiththefloeMark, GowiththefloePosition, GowiththefloeTurnPos, GowiththefloeTurnVar>;
export type GowiththefloeGraphics = Graphics<GowiththefloeTerrain, GowiththefloeUnit>;
export type GowiththefloeInstructions = Instructions<GowiththefloeBattlePos, GowiththefloeBattleVar, GowiththefloeCommand, GowiththefloeGrid, GowiththefloeLayer, GowiththefloeMark, GowiththefloePhase, GowiththefloeTurnPos, GowiththefloeTurnVar, GowiththefloeUnit>;
export type GowiththefloeMeta = AlgolMeta<GowiththefloeCommand, GowiththefloeMark>;
export type GowiththefloeScripts = GameTestSuite;
export type GowiththefloeSetup = Setup<GowiththefloePosition, GowiththefloeUnit>;

export type GowiththefloeDefinition = FullDef<GowiththefloeAiArtifactLayer, GowiththefloeAiAspect, GowiththefloeAiBrain, GowiththefloeAiGenerator, GowiththefloeAiGrid, GowiththefloeAiTerrain, GowiththefloeAiTerrainLayer, GowiththefloeArtifactLayer, GowiththefloeBattlePos, GowiththefloeBattleVar, GowiththefloeBoardHeight, GowiththefloeBoardWidth, GowiththefloeCommand, GowiththefloeGenerator, GowiththefloeGrid, GowiththefloeLayer, GowiththefloeMark, GowiththefloePhase, GowiththefloePosition, GowiththefloeTerrain, GowiththefloeTurnPos, GowiththefloeTurnVar, GowiththefloeUnit>;

export type GowiththefloeGrid = never;

export type GowiththefloeAiGenerator = never;

export type GowiththefloeAiAspect = never;

export type GowiththefloeAiGrid = never;

export type GowiththefloeAiArtifactLayer = never;

export type GowiththefloeAiBrain = never;

export type GowiththefloeAiTerrainLayer = never;

export type GowiththefloeAiTerrain = never;

export type GowiththefloePosition = "a1" | "a2" | "a3" | "a4" | "a5" | "a6" | "a7" | "a8" | "b1" | "b2" | "b3" | "b4" | "b5" | "b6" | "b7" | "b8" | "c1" | "c2" | "c3" | "c4" | "c5" | "c6" | "c7" | "c8" | "d1" | "d2" | "d3" | "d4" | "d5" | "d6" | "d7" | "d8" | "e1" | "e2" | "e3" | "e4" | "e5" | "e6" | "e7" | "e8" | "f1" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "f8" | "g1" | "g2" | "g3" | "g4" | "g5" | "g6" | "g7" | "g8" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h7" | "h8";
