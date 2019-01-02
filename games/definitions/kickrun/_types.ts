import { CommonLayer } from '../../types';

export type KickrunTerrain = "corners";
export type KickrunUnit = "runners" | "sidekickers";
export type KickrunMark = "selectunit" | "selectmovetarget";
export type KickrunCommand = "move";
export type KickrunPhaseCommand = never;
export type KickrunPhase = "startTurn" | KickrunMark;
export type KickrunUnitLayer = "runners" | "myrunners" | "neutralrunners" | "opprunners" | "sidekickers" | "mysidekickers" | "neutralsidekickers" | "oppsidekickers";
export type KickrunGenerator = "findmovetargets";
export type KickrunArtifactLayer = "movetargets";
export type KickrunTerrainLayer = "corners" | "nocorners" | "mycorners" | "oppcorners";
export type KickrunLayer = CommonLayer | KickrunUnitLayer | KickrunArtifactLayer | KickrunTerrainLayer;
