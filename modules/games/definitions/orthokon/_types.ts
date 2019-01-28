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
 
export type OrthokonGenerators = Generators<OrthokonArtifactLayer, OrthokonBattlePos, OrthokonBattleVar, OrthokonCommand, OrthokonGenerator, OrthokonGrid, OrthokonLayer, OrthokonMark, OrthokonTurnPos, OrthokonTurnVar>;
export type OrthokonFlow = Flow<OrthokonBattlePos, OrthokonBattleVar, OrthokonCommand, OrthokonGenerator, OrthokonGrid, OrthokonLayer, OrthokonMark, OrthokonTurnPos, OrthokonTurnVar, OrthokonUnit>;
export type OrthokonBoard = Board<OrthokonTerrain>;
export type OrthokonAI = AI<OrthokonAiArtifactLayer, OrthokonAiAspect, OrthokonAiBrain, OrthokonAiGenerator, OrthokonAiGrid, OrthokonAiTerrain, OrthokonAiTerrainLayer, OrthokonBattlePos, OrthokonBattleVar, OrthokonCommand, OrthokonGrid, OrthokonLayer, OrthokonMark, OrthokonTurnPos, OrthokonTurnVar>;
export type OrthokonGraphics = Graphics<OrthokonTerrain, OrthokonUnit>;
export type OrthokonInstructions = Instructions<OrthokonBattlePos, OrthokonBattleVar, OrthokonCommand, OrthokonGrid, OrthokonLayer, OrthokonMark, OrthokonPhase, OrthokonTurnPos, OrthokonTurnVar, OrthokonUnit>;
export type OrthokonMeta = Meta;
export type OrthokonScripts = GameTestSuite;
export type OrthokonSetup = Setup<OrthokonPosition, OrthokonUnit>;

export type OrthokonDefinition = FullDef<OrthokonAiArtifactLayer, OrthokonAiAspect, OrthokonAiBrain, OrthokonAiGenerator, OrthokonAiGrid, OrthokonAiTerrain, OrthokonAiTerrainLayer, OrthokonArtifactLayer, OrthokonBattlePos, OrthokonBattleVar, OrthokonCommand, OrthokonGenerator, OrthokonGrid, OrthokonLayer, OrthokonMark, OrthokonPhase, OrthokonPosition, OrthokonTerrain, OrthokonTurnPos, OrthokonTurnVar, OrthokonUnit>;

export type OrthokonGrid = never;

export type OrthokonAiGenerator = never;

export type OrthokonAiAspect = "headcount";

export type OrthokonAiGrid = never;

export type OrthokonAiArtifactLayer = never;

export type OrthokonAiBrain = "Bob";

export type OrthokonAiTerrainLayer = never;

export type OrthokonAiTerrain = never;

export type OrthokonPosition = "a1" | "a2" | "a3" | "a4" | "b1" | "b2" | "b3" | "b4" | "c1" | "c2" | "c3" | "c4" | "d1" | "d2" | "d3" | "d4";
