import { CommonLayer } from '../../types';

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
