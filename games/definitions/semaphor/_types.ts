import { CommonLayer } from '../../types';

export type SemaphorTerrain = never;
export type SemaphorUnit = "kings" | "pawns" | "bishops";
export type SemaphorMark = "selectdeploytarget" | "selectunit";
export type SemaphorCommand = "deploy" | "promote";
export type SemaphorPhaseCommand = never;
export type SemaphorPhase = "startTurn" | SemaphorMark;
export type SemaphorUnitLayer = "kings" | "mykings" | "neutralkings" | "oppkings" | "pawns" | "mypawns" | "neutralpawns" | "opppawns" | "bishops" | "mybishops" | "neutralbishops" | "oppbishops";
export type SemaphorGenerator = "findlines";
export type SemaphorArtifactLayer = "line";
export type SemaphorTerrainLayer = never;
export type SemaphorLayer = CommonLayer | SemaphorUnitLayer | SemaphorArtifactLayer;
