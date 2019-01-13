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
 
export type DuploGenerators = Generators<DuploArtifactLayer, DuploGenerator, DuploLayer>;
export type DuploFlow = Flow<DuploArtifactLayer, DuploCommand, DuploGenerator, DuploLayer, DuploMark, DuploUnit>;
export type DuploBoard = Board<DuploTerrain>;
export type DuploAI = AI;
export type DuploGraphics = Graphics<DuploTerrain, DuploUnit>;
export type DuploInstructions = Instructions<DuploPhase>;
export type DuploMeta = Meta;
export type DuploScripts = GameTestSuite;
export type DuploSetup = Setup<DuploUnit>;

export type DuploDefinition = FullDef<DuploLayer, DuploMark, DuploCommand, DuploTurnPos, DuploTurnVar, DuploBattlePos, DuploBattleVar, DuploArtifactLayer, DuploGenerator, DuploPhase, DuploTerrain, DuploUnit>;
