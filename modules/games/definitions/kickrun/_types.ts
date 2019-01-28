import { CommonLayer, Generators, Flow, Board, AI, Graphics, Instructions, Meta, Setup, GameTestSuite, FullDef } from '../../../types';

export type KickrunBoardHeight = 5;
export type KickrunBoardWidth = 5;

export type KickrunTerrain = "corners";
export type KickrunUnit = "runners" | "sidekickers";
export type KickrunMark = "selectunit" | "selectmovetarget";
export type KickrunCommand = "move";
export type KickrunPhaseCommand = never;
export type KickrunPhase = "startTurn" | KickrunMark;
export type KickrunUnitLayer = "runners" | "myrunners" | "neutralrunners" | "opprunners" | "sidekickers" | "mysidekickers" | "neutralsidekickers" | "oppsidekickers";
export type KickrunGenerator = "findmovetargets";
export type KickrunArtifactLayer = "movetargets";
export type KickrunTerrainLayer = "corners" | "mycorners" | "oppcorners" | "nocorners";
export type KickrunLayer = CommonLayer | KickrunUnitLayer | KickrunArtifactLayer | KickrunTerrainLayer;
export type KickrunBattlePos = any;
export type KickrunBattleVar = any;
export type KickrunTurnPos = any;
export type KickrunTurnVar = any;
 
export type KickrunGenerators = Generators<KickrunArtifactLayer, KickrunBattlePos, KickrunBattleVar, KickrunCommand, KickrunGenerator, KickrunGrid, KickrunLayer, KickrunMark, KickrunTurnPos, KickrunTurnVar>;
export type KickrunFlow = Flow<KickrunBattlePos, KickrunBattleVar, KickrunCommand, KickrunGenerator, KickrunGrid, KickrunLayer, KickrunMark, KickrunTurnPos, KickrunTurnVar, KickrunUnit>;
export type KickrunBoard = Board<KickrunBoardHeight, KickrunBoardWidth, KickrunPosition, KickrunTerrain>;
export type KickrunAI = AI<KickrunAiArtifactLayer, KickrunAiAspect, KickrunAiBrain, KickrunAiGenerator, KickrunAiGrid, KickrunAiTerrain, KickrunAiTerrainLayer, KickrunBattlePos, KickrunBattleVar, KickrunBoardHeight, KickrunBoardWidth, KickrunCommand, KickrunGrid, KickrunLayer, KickrunMark, KickrunPosition, KickrunTurnPos, KickrunTurnVar>;
export type KickrunGraphics = Graphics<KickrunTerrain, KickrunUnit>;
export type KickrunInstructions = Instructions<KickrunBattlePos, KickrunBattleVar, KickrunCommand, KickrunGrid, KickrunLayer, KickrunMark, KickrunPhase, KickrunTurnPos, KickrunTurnVar, KickrunUnit>;
export type KickrunMeta = Meta;
export type KickrunScripts = GameTestSuite;
export type KickrunSetup = Setup<KickrunPosition, KickrunUnit>;

export type KickrunDefinition = FullDef<KickrunAiArtifactLayer, KickrunAiAspect, KickrunAiBrain, KickrunAiGenerator, KickrunAiGrid, KickrunAiTerrain, KickrunAiTerrainLayer, KickrunArtifactLayer, KickrunBattlePos, KickrunBattleVar, KickrunBoardHeight, KickrunBoardWidth, KickrunCommand, KickrunGenerator, KickrunGrid, KickrunLayer, KickrunMark, KickrunPhase, KickrunPosition, KickrunTerrain, KickrunTurnPos, KickrunTurnVar, KickrunUnit>;

export type KickrunGrid = never;

export type KickrunAiGenerator = never;

export type KickrunAiAspect = never;

export type KickrunAiGrid = never;

export type KickrunAiArtifactLayer = never;

export type KickrunAiBrain = never;

export type KickrunAiTerrainLayer = never;

export type KickrunAiTerrain = never;

export type KickrunPosition = "a1" | "a2" | "a3" | "a4" | "a5" | "b1" | "b2" | "b3" | "b4" | "b5" | "c1" | "c2" | "c3" | "c4" | "c5" | "d1" | "d2" | "d3" | "d4" | "d5" | "e1" | "e2" | "e3" | "e4" | "e5";
