import { CommonLayer } from '../../../types';

export type AmazonsTerrain = never;
export type AmazonsUnit = "queens" | "fires";
export type AmazonsMark = "selectunit" | "selectmovetarget" | "selectfiretarget";
export type AmazonsCommand = "move" | "fire";
export type AmazonsPhaseCommand = "move";
export type AmazonsPhase = "startTurn" | AmazonsMark | AmazonsPhaseCommand;
export type AmazonsUnitLayer = "queens" | "myqueens" | "neutralqueens" | "oppqueens" | "fires" | "myfires" | "neutralfires" | "oppfires";
export type AmazonsGenerator = "findtargets";
export type AmazonsArtifactLayer = "targets";
export type AmazonsTerrainLayer = never;
export type AmazonsLayer = CommonLayer | AmazonsUnitLayer | AmazonsArtifactLayer;
