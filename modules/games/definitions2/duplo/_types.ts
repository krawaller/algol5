import { CommonLayer, Generators, Flow, Board, AI, Graphics, Instructions, Meta, Setup, GameTestSuite, FullDef } from '../../../types';

export type DuploTerrain = never;
export type DuploUnit = "soldiers";
export type DuploMark = "selectdeploy" | "selectunit" | "selecttarget";
export type DuploCommand = "deploy" | "expand";
export type DuploPhaseCommand = "deploy";
export type DuploPhase = "startTurn" | DuploMark | DuploPhaseCommand;
export type DuploUnitLayer = "soldiers" | "mysoldiers" | "neutralsoldiers" | "oppsoldiers";
export type DuploGenerator = "findspawndirs" | "findgrowstarts" | "findexpandpoints" | "findoppstrengths" | "findspawns";
export type DuploArtifactLayer = "spawndirs" | "growstarts" | "targets" | "potentialopptargets" | "spawns";
export type DuploTerrainLayer = never;
export type DuploLayer = CommonLayer | DuploUnitLayer | DuploArtifactLayer;
export type DuploBattlePos = any;
export type DuploBattleVar = any;
export type DuploTurnPos = any;
export type DuploTurnVar = any;
 
export type DuploGenerators = Generators<DuploArtifactLayer, DuploBattlePos, DuploBattleVar, DuploCommand, DuploGenerator, DuploGrid, DuploLayer, DuploMark, DuploTurnPos, DuploTurnVar>;
export type DuploFlow = Flow<DuploBattlePos, DuploBattleVar, DuploCommand, DuploGenerator, DuploGrid, DuploLayer, DuploMark, DuploTurnPos, DuploTurnVar, DuploUnit>;
export type DuploBoard = Board<DuploTerrain>;
export type DuploAI = AI<DuploAiArtifactLayer, DuploAiAspect, DuploAiBrain, DuploAiGenerator, DuploAiGrid, DuploAiTerrain, DuploAiTerrainLayer, DuploBattlePos, DuploBattleVar, DuploCommand, DuploGrid, DuploLayer, DuploMark, DuploTurnPos, DuploTurnVar>;
export type DuploGraphics = Graphics<DuploTerrain, DuploUnit>;
export type DuploInstructions = Instructions<DuploBattlePos, DuploBattleVar, DuploCommand, DuploGrid, DuploLayer, DuploMark, DuploPhase, DuploTurnPos, DuploTurnVar, DuploUnit>;
export type DuploMeta = Meta;
export type DuploScripts = GameTestSuite;
export type DuploSetup = Setup<DuploUnit>;

export type DuploDefinition = FullDef<DuploAiArtifactLayer, DuploAiAspect, DuploAiBrain, DuploAiGenerator, DuploAiGrid, DuploAiTerrain, DuploAiTerrainLayer, DuploArtifactLayer, DuploBattlePos, DuploBattleVar, DuploCommand, DuploGenerator, DuploGrid, DuploLayer, DuploMark, DuploPhase, DuploTerrain, DuploTurnPos, DuploTurnVar, DuploUnit>;

export type DuploGrid = never;

export type DuploAiGenerator = never;

export type DuploAiAspect = never;

export type DuploAiGrid = never;

export type DuploAiArtifactLayer = never;

export type DuploAiBrain = never;

export type DuploAiTerrainLayer = never;

export type DuploAiTerrain = never;
