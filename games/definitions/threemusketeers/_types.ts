import { CommonLayer } from '../../types';

export type ThreemusketeersTerrain = never;
export type ThreemusketeersUnit = "pawns" | "kings";
export type ThreemusketeersMark = "selectunit" | "selectmovetarget";
export type ThreemusketeersCommand = "move";
export type ThreemusketeersPhaseCommand = never;
export type ThreemusketeersPhase = "startTurn" | ThreemusketeersMark;
export type ThreemusketeersUnitLayer = "pawns" | "mypawns" | "neutralpawns" | "opppawns" | "kings" | "mykings" | "neutralkings" | "oppkings";
export type ThreemusketeersGenerator = "findstrandedmusketeers" | "findmusketeerline" | "findmovetargets";
export type ThreemusketeersArtifactLayer = "strandedmusketeers" | "musketeerline" | "movetargets";
export type ThreemusketeersTerrainLayer = never;
export type ThreemusketeersLayer = CommonLayer | ThreemusketeersUnitLayer | ThreemusketeersArtifactLayer;
