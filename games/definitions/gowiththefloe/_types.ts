import { CommonLayer } from '../../types';

export type GowiththefloeTerrain = "water";
export type GowiththefloeUnit = "seals" | "bears" | "holes";
export type GowiththefloeMark = "selectunit" | "selectmovetarget" | "selecteattarget";
export type GowiththefloeCommand = "move" | "eat";
export type GowiththefloePhaseCommand = never;
export type GowiththefloePhase = "startTurn" | GowiththefloeMark;
export type GowiththefloeUnitLayer = "seals" | "myseals" | "neutralseals" | "oppseals" | "bears" | "mybears" | "neutralbears" | "oppbears" | "holes" | "myholes" | "neutralholes" | "oppholes";
export type GowiththefloeGenerator = "findeattargets" | "findmovetargets" | "findsealsmoves" | "findcracks";
export type GowiththefloeArtifactLayer = "eattargets" | "movetargets" | "canmove" | "cracks";
export type GowiththefloeTerrainLayer = "water" | "nowater";
export type GowiththefloeLayer = CommonLayer | GowiththefloeUnitLayer | GowiththefloeArtifactLayer | GowiththefloeTerrainLayer;
