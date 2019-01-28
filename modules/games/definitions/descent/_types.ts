import { CommonLayer, Generators, Flow, Board, AI, Graphics, Instructions, Meta, Setup, GameTestSuite, FullDef } from '../../../types';

export type DescentTerrain = never;
export type DescentUnit = "pawns" | "knights" | "rooks";
export type DescentMark = "selectunit" | "selectmovetarget" | "selectdigtarget";
export type DescentCommand = "move" | "dig";
export type DescentPhaseCommand = "move";
export type DescentPhase = "startTurn" | DescentMark | DescentPhaseCommand;
export type DescentUnitLayer = "pawns" | "mypawns" | "neutralpawns" | "opppawns" | "knights" | "myknights" | "neutralknights" | "oppknights" | "rooks" | "myrooks" | "neutralrooks" | "opprooks";
export type DescentGenerator = "findmovetargets" | "finddigtargets" | "findwinlines";
export type DescentArtifactLayer = "movetargets" | "digtargets" | "winline";
export type DescentTerrainLayer = never;
export type DescentLayer = CommonLayer | DescentUnitLayer | DescentArtifactLayer;
export type DescentBattlePos = any;
export type DescentBattleVar = any;
export type DescentTurnPos = any;
export type DescentTurnVar = any;
 
export type DescentGenerators = Generators<DescentArtifactLayer, DescentBattlePos, DescentBattleVar, DescentCommand, DescentGenerator, DescentGrid, DescentLayer, DescentMark, DescentTurnPos, DescentTurnVar>;
export type DescentFlow = Flow<DescentBattlePos, DescentBattleVar, DescentCommand, DescentGenerator, DescentGrid, DescentLayer, DescentMark, DescentTurnPos, DescentTurnVar, DescentUnit>;
export type DescentBoard = Board<DescentTerrain>;
export type DescentAI = AI<DescentAiArtifactLayer, DescentAiAspect, DescentAiBrain, DescentAiGenerator, DescentAiGrid, DescentAiTerrain, DescentAiTerrainLayer, DescentBattlePos, DescentBattleVar, DescentCommand, DescentGrid, DescentLayer, DescentMark, DescentTurnPos, DescentTurnVar>;
export type DescentGraphics = Graphics<DescentTerrain, DescentUnit>;
export type DescentInstructions = Instructions<DescentBattlePos, DescentBattleVar, DescentCommand, DescentGrid, DescentLayer, DescentMark, DescentPhase, DescentTurnPos, DescentTurnVar, DescentUnit>;
export type DescentMeta = Meta;
export type DescentScripts = GameTestSuite;
export type DescentSetup = Setup<DescentUnit>;

export type DescentDefinition = FullDef<DescentAiArtifactLayer, DescentAiAspect, DescentAiBrain, DescentAiGenerator, DescentAiGrid, DescentAiTerrain, DescentAiTerrainLayer, DescentArtifactLayer, DescentBattlePos, DescentBattleVar, DescentCommand, DescentGenerator, DescentGrid, DescentLayer, DescentMark, DescentPhase, DescentTerrain, DescentTurnPos, DescentTurnVar, DescentUnit>;

export type DescentGrid = never;

export type DescentAiGenerator = never;

export type DescentAiAspect = never;

export type DescentAiGrid = never;

export type DescentAiArtifactLayer = never;

export type DescentAiBrain = never;

export type DescentAiTerrainLayer = never;

export type DescentAiTerrain = never;

export type DescentPosition = ["a1","a2","a3","a4","b1","b2","b3","b4","c1","c2","c3","c4","d1","d2","d3","d4"];
