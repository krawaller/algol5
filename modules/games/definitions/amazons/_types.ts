import { CommonLayer, Generators, Flow, AlgolBoard, AI, Graphics, Instructions, Meta, Setup, GameTestSuite, FullDef } from '../../../types';

export type AmazonsBoardHeight = 10;
export type AmazonsBoardWidth = 10;

export type AmazonsTerrain = never;
export type AmazonsUnit = "queens" | "fires";
export type AmazonsMark = "selectunit" | "selectmovetarget" | "selectfiretarget";
export type AmazonsCommand = "move" | "fire";
export type AmazonsPhaseCommand = "move";
export type AmazonsPhase = "startTurn" | AmazonsMark | AmazonsPhaseCommand;
export type AmazonsUnitLayer = "units" | "myunits" | "oppunits" | "queens";
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
export type AmazonsBoard = AlgolBoard<AmazonsBoardHeight, AmazonsBoardWidth, AmazonsGrid, AmazonsPosition, AmazonsTerrain>;
export type AmazonsAI = AI<AmazonsAiArtifactLayer, AmazonsAiAspect, AmazonsAiBrain, AmazonsAiGenerator, AmazonsAiGrid, AmazonsAiTerrain, AmazonsAiTerrainLayer, AmazonsBattlePos, AmazonsBattleVar, AmazonsBoardHeight, AmazonsBoardWidth, AmazonsCommand, AmazonsGrid, AmazonsLayer, AmazonsMark, AmazonsPosition, AmazonsTurnPos, AmazonsTurnVar>;
export type AmazonsGraphics = Graphics<AmazonsTerrain, AmazonsUnit>;
export type AmazonsInstructions = Instructions<AmazonsBattlePos, AmazonsBattleVar, AmazonsCommand, AmazonsGrid, AmazonsLayer, AmazonsMark, AmazonsPhase, AmazonsTurnPos, AmazonsTurnVar, AmazonsUnit>;
export type AmazonsMeta = Meta;
export type AmazonsScripts = GameTestSuite;
export type AmazonsSetup = Setup<AmazonsPosition, AmazonsUnit>;

export type AmazonsDefinition = FullDef<AmazonsAiArtifactLayer, AmazonsAiAspect, AmazonsAiBrain, AmazonsAiGenerator, AmazonsAiGrid, AmazonsAiTerrain, AmazonsAiTerrainLayer, AmazonsArtifactLayer, AmazonsBattlePos, AmazonsBattleVar, AmazonsBoardHeight, AmazonsBoardWidth, AmazonsCommand, AmazonsGenerator, AmazonsGrid, AmazonsLayer, AmazonsMark, AmazonsPhase, AmazonsPosition, AmazonsTerrain, AmazonsTurnPos, AmazonsTurnVar, AmazonsUnit>;

export type AmazonsGrid = never;

export type AmazonsAiGenerator = "findroads" | "findreach";

export type AmazonsAiAspect = "myroads" | "mydomain" | "opproads" | "oppdomain";

export type AmazonsAiGrid = never;

export type AmazonsAiArtifactLayer = "myroads" | "opproads" | "myreach" | "oppreach";

export type AmazonsAiBrain = "Steve";

export type AmazonsAiTerrainLayer = never;

export type AmazonsAiTerrain = never;

export type AmazonsPosition = "a1" | "a10" | "a2" | "a3" | "a4" | "a5" | "a6" | "a7" | "a8" | "a9" | "b1" | "b10" | "b2" | "b3" | "b4" | "b5" | "b6" | "b7" | "b8" | "b9" | "c1" | "c10" | "c2" | "c3" | "c4" | "c5" | "c6" | "c7" | "c8" | "c9" | "d1" | "d10" | "d2" | "d3" | "d4" | "d5" | "d6" | "d7" | "d8" | "d9" | "e1" | "e10" | "e2" | "e3" | "e4" | "e5" | "e6" | "e7" | "e8" | "e9" | "f1" | "f10" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "f8" | "f9" | "g1" | "g10" | "g2" | "g3" | "g4" | "g5" | "g6" | "g7" | "g8" | "g9" | "h1" | "h10" | "h2" | "h3" | "h4" | "h5" | "h6" | "h7" | "h8" | "h9" | "i1" | "i10" | "i2" | "i3" | "i4" | "i5" | "i6" | "i7" | "i8" | "i9" | "j1" | "j10" | "j2" | "j3" | "j4" | "j5" | "j6" | "j7" | "j8" | "j9";
