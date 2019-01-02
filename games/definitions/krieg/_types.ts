import { CommonLayer } from '../../types';

export type KriegTerrain = "southeast" | "northwest" | "corners" | "bases";
export type KriegUnit = "notfrozens" | "frozens";
export type KriegMark = "selectunit" | "selectmove";
export type KriegCommand = "move";
export type KriegPhaseCommand = never;
export type KriegPhase = "startTurn" | KriegMark;
export type KriegUnitLayer = "notfrozens" | "mynotfrozens" | "neutralnotfrozens" | "oppnotfrozens" | "frozens" | "myfrozens" | "neutralfrozens" | "oppfrozens";
export type KriegGenerator = "findmovetargets";
export type KriegArtifactLayer = "movetargets";
export type KriegTerrainLayer = "southeast" | "nosoutheast" | "northwest" | "nonorthwest" | "corners" | "nocorners" | "mycorners" | "oppcorners" | "bases" | "nobases" | "mybases" | "oppbases";
export type KriegLayer = CommonLayer | KriegUnitLayer | KriegArtifactLayer | KriegTerrainLayer;
