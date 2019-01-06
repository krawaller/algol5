import { CommonLayer } from '../../../types';

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
