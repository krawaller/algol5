import { CommonLayer } from '../../types';

export type UglyduckTerrain = "homerow";
export type UglyduckUnit = "soldiers" | "kings";
export type UglyduckMark = "selectunit" | "selectmovetarget";
export type UglyduckCommand = "move";
export type UglyduckPhaseCommand = never;
export type UglyduckPhase = "startTurn" | UglyduckMark;
export type UglyduckUnitLayer = "soldiers" | "mysoldiers" | "neutralsoldiers" | "oppsoldiers" | "kings" | "mykings" | "neutralkings" | "oppkings";
export type UglyduckGenerator = "findmovetargets";
export type UglyduckArtifactLayer = "movetargets";
export type UglyduckTerrainLayer = "homerow" | "nohomerow" | "myhomerow" | "opphomerow";
export type UglyduckLayer = CommonLayer | UglyduckUnitLayer | UglyduckArtifactLayer | UglyduckTerrainLayer;
