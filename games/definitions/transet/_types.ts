import { CommonLayer } from '../../../types';

export type TransetTerrain = "base";
export type TransetUnit = "pinets" | "piokers" | "piases";
export type TransetMark = "selectunit" | "selectmovetarget" | "selectdeportdestination" | "selectswapunit" | "selectswap1target";
export type TransetCommand = "move" | "swap";
export type TransetPhaseCommand = never;
export type TransetPhase = "startTurn" | TransetMark;
export type TransetUnitLayer = "pinets" | "mypinets" | "neutralpinets" | "opppinets" | "piokers" | "mypiokers" | "neutralpiokers" | "opppiokers" | "piases" | "mypiases" | "neutralpiases" | "opppiases";
export type TransetGenerator = "findswap2step" | "findswap1steps" | "findmovetargets";
export type TransetArtifactLayer = "swap2step" | "swap1steps" | "movetargets";
export type TransetTerrainLayer = "base" | "nobase" | "mybase" | "oppbase";
export type TransetLayer = CommonLayer | TransetUnitLayer | TransetArtifactLayer | TransetTerrainLayer;
