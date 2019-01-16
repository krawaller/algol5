import { CommonLayer, Generators, Flow, Board, AI, Graphics, Instructions, Meta, Setup, GameTestSuite, FullDef } from '../../../types';

export type DescentTerrain = never;
export type DescentUnit = "pawns" | "knights" | "rooks";
export type DescentMark = "selectunit" | "selectmovetarget" | "selectdigtarget";
export type DescentCommand = "move" | "dig";
export type DescentPhaseCommand = "move" | "dig";
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
 
export type DescentGenerators = Generators<DescentArtifactLayer, DescentBattlePos, DescentBattleVar, DescentCommand, DescentGenerator, DescentLayer, DescentMark, DescentTurnPos, DescentTurnVar>;
export type DescentFlow = Flow<DescentBattlePos, DescentBattleVar, DescentCommand, DescentGenerator, DescentLayer, DescentMark, DescentTurnPos, DescentTurnVar, DescentUnit>;
export type DescentBoard = Board<DescentTerrain>;
export type DescentAI = AI;
export type DescentGraphics = Graphics<DescentTerrain, DescentUnit>;
export type DescentInstructions = Instructions<DescentPhase>;
export type DescentMeta = Meta;
export type DescentScripts = GameTestSuite;
export type DescentSetup = Setup<DescentUnit>;

export type DescentDefinition = FullDef<DescentArtifactLayer, DescentBattlePos, DescentBattleVar, DescentCommand, DescentGenerator, DescentLayer, DescentMark, DescentPhase, DescentTerrain, DescentTurnPos, DescentTurnVar, DescentUnit>;
