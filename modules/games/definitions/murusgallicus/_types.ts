import { CommonLayer } from '../../../types';

export type MurusgallicusTerrain = "homerow";
export type MurusgallicusUnit = "towers" | "walls";
export type MurusgallicusMark = "selecttower" | "selectmove" | "selectkill";
export type MurusgallicusCommand = "move" | "kill";
export type MurusgallicusPhaseCommand = never;
export type MurusgallicusPhase = "startTurn" | MurusgallicusMark;
export type MurusgallicusUnitLayer = "towers" | "mytowers" | "neutraltowers" | "opptowers" | "walls" | "mywalls" | "neutralwalls" | "oppwalls";
export type MurusgallicusGenerator = "findmovetargets" | "findmoveresults" | "findkilltargets";
export type MurusgallicusArtifactLayer = "movetargets" | "madetowers" | "madewalls" | "killtargets";
export type MurusgallicusTerrainLayer = "homerow" | "nohomerow" | "myhomerow" | "opphomerow";
export type MurusgallicusLayer = CommonLayer | MurusgallicusUnitLayer | MurusgallicusArtifactLayer | MurusgallicusTerrainLayer;
