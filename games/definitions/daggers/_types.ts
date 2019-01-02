import { CommonLayer } from '../../types';

export type DaggersTerrain = "base";
export type DaggersUnit = "daggers" | "crowns";
export type DaggersMark = "selectunit" | "selectmovetarget";
export type DaggersCommand = "move";
export type DaggersPhaseCommand = never;
export type DaggersPhase = "startTurn" | DaggersMark;
export type DaggersUnitLayer = "daggers" | "mydaggers" | "neutraldaggers" | "oppdaggers" | "crowns" | "mycrowns" | "neutralcrowns" | "oppcrowns";
export type DaggersGenerator = "findcrowntargets" | "finddaggertargets";
export type DaggersArtifactLayer = "movetarget";
export type DaggersTerrainLayer = "base" | "nobase" | "mybase" | "oppbase";
export type DaggersLayer = CommonLayer | DaggersUnitLayer | DaggersArtifactLayer | DaggersTerrainLayer;
