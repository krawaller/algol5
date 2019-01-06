import { CommonLayer } from '../../../types';

export type JostleTerrain = never;
export type JostleUnit = "checkers";
export type JostleMark = "selectunit" | "selectmovetarget";
export type JostleCommand = "jostle";
export type JostlePhaseCommand = never;
export type JostlePhase = "startTurn" | JostleMark;
export type JostleUnitLayer = "checkers" | "mycheckers" | "neutralcheckers" | "oppcheckers";
export type JostleGenerator = "findinitial" | "findnew";
export type JostleArtifactLayer = "movetargets" | "initialenemy" | "initialfriend" | "newenemy" | "newfriend";
export type JostleTerrainLayer = never;
export type JostleLayer = CommonLayer | JostleUnitLayer | JostleArtifactLayer;
