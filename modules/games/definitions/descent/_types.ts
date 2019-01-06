import { CommonLayer } from '../../../types';

export type DescentTerrain = never;
export type DescentUnit = "pawns" | "knights" | "rooks";
export type DescentMark = "selectunit" | "selectmovetarget" | "selectdigtarget";
export type DescentCommand = "move" | "dig";
export type DescentPhaseCommand = "move";
export type DescentPhase = "startTurn" | DescentMark | DescentPhaseCommand;
export type DescentUnitLayer = "pawns" | "mypawns" | "neutralpawns" | "opppawns" | "knights" | "myknights" | "neutralknights" | "oppknights" | "rooks" | "myrooks" | "neutralrooks" | "opprooks";
export type DescentGenerator = "findmovetargets" | "finddigtargets" | "findwinlines";
export type DescentArtifactLayer = "movetargets" | "digtargets" | "winline";
export type DescentTerrainLayer = never;
export type DescentLayer = CommonLayer | DescentUnitLayer | DescentArtifactLayer;
