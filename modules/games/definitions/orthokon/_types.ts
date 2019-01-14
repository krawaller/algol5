import { CommonLayer, Generators, Flow, Board, AI, Graphics, Instructions, Meta, Setup, GameTestSuite, FullDef } from '../../../types';

export type OrthokonTerrain = never;
export type OrthokonUnit = "soldiers";
export type OrthokonMark = "selectunit" | "selectmovetarget";
export type OrthokonCommand = "move";
export type OrthokonPhaseCommand = never;
export type OrthokonPhase = "startTurn" | OrthokonMark;
export type OrthokonUnitLayer = "soldiers" | "mysoldiers" | "neutralsoldiers" | "oppsoldiers";
export type OrthokonGenerator = "findvictims" | "findmovetargets";
export type OrthokonArtifactLayer = "victims" | "movetargets";
export type OrthokonTerrainLayer = never;
export type OrthokonLayer = CommonLayer | OrthokonUnitLayer | OrthokonArtifactLayer;
export type OrthokonBattlePos = any;
export type OrthokonBattleVar = any;
export type OrthokonTurnPos = any;
export type OrthokonTurnVar = any;
 
export type OrthokonGenerators = Generators<OrthokonArtifactLayer, OrthokonBattlePos, OrthokonBattleVar, OrthokonCommand, OrthokonGenerator, OrthokonLayer, OrthokonMark, OrthokonTurnPos, OrthokonTurnVar>;
export type OrthokonFlow = Flow<OrthokonArtifactLayer, OrthokonCommand, OrthokonGenerator, OrthokonLayer, OrthokonMark, OrthokonUnit>;
export type OrthokonBoard = Board<OrthokonTerrain>;
export type OrthokonAI = AI;
export type OrthokonGraphics = Graphics<OrthokonTerrain, OrthokonUnit>;
export type OrthokonInstructions = Instructions<OrthokonPhase>;
export type OrthokonMeta = Meta;
export type OrthokonScripts = GameTestSuite;
export type OrthokonSetup = Setup<OrthokonUnit>;

export type OrthokonDefinition = FullDef<OrthokonArtifactLayer, OrthokonBattlePos, OrthokonBattleVar, OrthokonCommand, OrthokonGenerator, OrthokonLayer, OrthokonMark, OrthokonPhase, OrthokonTerrain, OrthokonTurnPos, OrthokonTurnVar, OrthokonUnit>;
