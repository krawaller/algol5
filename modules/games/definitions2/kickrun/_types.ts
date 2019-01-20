import { CommonLayer, Generators, Flow, Board, AI, Graphics, Instructions, Meta, Setup, GameTestSuite, FullDef } from '../../../types';

export type KickrunTerrain = "corners";
export type KickrunUnit = "runners" | "sidekickers";
export type KickrunMark = "selectunit" | "selectmovetarget";
export type KickrunCommand = "move";
export type KickrunPhaseCommand = never;
export type KickrunPhase = "startTurn" | KickrunMark;
export type KickrunUnitLayer = "runners" | "myrunners" | "neutralrunners" | "opprunners" | "sidekickers" | "mysidekickers" | "neutralsidekickers" | "oppsidekickers";
export type KickrunGenerator = "findmovetargets";
export type KickrunArtifactLayer = "movetargets";
export type KickrunTerrainLayer = "corners" | "nocorners" | "mycorners" | "oppcorners";
export type KickrunLayer = CommonLayer | KickrunUnitLayer | KickrunArtifactLayer | KickrunTerrainLayer;
export type KickrunBattlePos = any;
export type KickrunBattleVar = any;
export type KickrunTurnPos = any;
export type KickrunTurnVar = any;
 
export type KickrunGenerators = Generators<KickrunArtifactLayer, KickrunBattlePos, KickrunBattleVar, KickrunCommand, KickrunGenerator, KickrunGrid, KickrunLayer, KickrunMark, KickrunTurnPos, KickrunTurnVar>;
export type KickrunFlow = Flow<KickrunBattlePos, KickrunBattleVar, KickrunCommand, KickrunGenerator, KickrunGrid, KickrunLayer, KickrunMark, KickrunTurnPos, KickrunTurnVar, KickrunUnit>;
export type KickrunBoard = Board<KickrunTerrain>;
export type KickrunAI = AI<KickrunAiArtifactLayer, KickrunAiAspect, KickrunAiBrain, KickrunAiGenerator, KickrunAiGrid, KickrunAiTerrain, KickrunAiTerrainLayer, KickrunBattlePos, KickrunBattleVar, KickrunCommand, KickrunGrid, KickrunLayer, KickrunMark, KickrunTurnPos, KickrunTurnVar>;
export type KickrunGraphics = Graphics<KickrunTerrain, KickrunUnit>;
export type KickrunInstructions = Instructions<KickrunBattlePos, KickrunBattleVar, KickrunCommand, KickrunGrid, KickrunLayer, KickrunMark, KickrunPhase, KickrunTurnPos, KickrunTurnVar, KickrunUnit>;
export type KickrunMeta = Meta;
export type KickrunScripts = GameTestSuite;
export type KickrunSetup = Setup<KickrunUnit>;

export type KickrunDefinition = FullDef<KickrunAiArtifactLayer, KickrunAiAspect, KickrunAiBrain, KickrunAiGenerator, KickrunAiGrid, KickrunAiTerrain, KickrunAiTerrainLayer, KickrunArtifactLayer, KickrunBattlePos, KickrunBattleVar, KickrunCommand, KickrunGenerator, KickrunGrid, KickrunLayer, KickrunMark, KickrunPhase, KickrunTerrain, KickrunTurnPos, KickrunTurnVar, KickrunUnit>;

export type KickrunGrid = never;

export type KickrunAiGenerator = never;

export type KickrunAiAspect = never;

export type KickrunAiGrid = never;

export type KickrunAiArtifactLayer = never;

export type KickrunAiBrain = never;

export type KickrunAiTerrainLayer = never;

export type KickrunAiTerrain = never;
