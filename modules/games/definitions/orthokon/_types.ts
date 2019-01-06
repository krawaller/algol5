import { CommonLayer } from '../../../types';

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
