import { CommonLayer, Generators, Flow, Board, AI, Graphics, Instructions, Meta, Setup, GameTestSuite, FullDef } from '../../../types';

export type AtriumTerrain = never;
export type AtriumUnit = "kings" | "queens";
export type AtriumMark = "selectunit" | "selectmovetarget";
export type AtriumCommand = "move";
export type AtriumPhaseCommand = never;
export type AtriumPhase = "startTurn" | AtriumMark;
export type AtriumUnitLayer = "kings" | "mykings" | "neutralkings" | "oppkings" | "queens" | "myqueens" | "neutralqueens" | "oppqueens";
export type AtriumGenerator = "findmovetargets" | "findwinlines";
export type AtriumArtifactLayer = "movetargets" | "winline";
export type AtriumTerrainLayer = never;
export type AtriumLayer = CommonLayer | AtriumUnitLayer | AtriumArtifactLayer;
export type AtriumBattlePos = any;
export type AtriumBattleVar = any;
export type AtriumTurnPos = any;
export type AtriumTurnVar = any;
 
export type AtriumGenerators = Generators<AtriumArtifactLayer, AtriumBattlePos, AtriumBattleVar, AtriumCommand, AtriumGenerator, AtriumLayer, AtriumMark, AtriumTurnPos, AtriumTurnVar>;
export type AtriumFlow = Flow<AtriumBattlePos, AtriumBattleVar, AtriumCommand, AtriumGenerator, AtriumLayer, AtriumMark, AtriumTurnPos, AtriumTurnVar, AtriumUnit>;
export type AtriumBoard = Board<AtriumTerrain>;
export type AtriumAI = AI;
export type AtriumGraphics = Graphics<AtriumTerrain, AtriumUnit>;
export type AtriumInstructions = Instructions<AtriumPhase>;
export type AtriumMeta = Meta;
export type AtriumScripts = GameTestSuite;
export type AtriumSetup = Setup<AtriumUnit>;

export type AtriumDefinition = FullDef<AtriumArtifactLayer, AtriumBattlePos, AtriumBattleVar, AtriumCommand, AtriumGenerator, AtriumLayer, AtriumMark, AtriumPhase, AtriumTerrain, AtriumTurnPos, AtriumTurnVar, AtriumUnit>;
