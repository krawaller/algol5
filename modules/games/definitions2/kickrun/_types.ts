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
 
export type KickrunGenerators = Generators<KickrunArtifactLayer, KickrunBattlePos, KickrunBattleVar, KickrunCommand, KickrunGenerator, KickrunLayer, KickrunMark, KickrunTurnPos, KickrunTurnVar>;
export type KickrunFlow = Flow<KickrunArtifactLayer, KickrunCommand, KickrunGenerator, KickrunLayer, KickrunMark, KickrunUnit>;
export type KickrunBoard = Board<KickrunTerrain>;
export type KickrunAI = AI;
export type KickrunGraphics = Graphics<KickrunTerrain, KickrunUnit>;
export type KickrunInstructions = Instructions<KickrunPhase>;
export type KickrunMeta = Meta;
export type KickrunScripts = GameTestSuite;
export type KickrunSetup = Setup<KickrunUnit>;

export type KickrunDefinition = FullDef<KickrunArtifactLayer, KickrunBattlePos, KickrunBattleVar, KickrunCommand, KickrunGenerator, KickrunLayer, KickrunMark, KickrunPhase, KickrunTerrain, KickrunTurnPos, KickrunTurnVar, KickrunUnit>;
