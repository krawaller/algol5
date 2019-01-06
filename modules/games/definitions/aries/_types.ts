import { CommonLayer } from '../../../types';

export type AriesTerrain = "corner";
export type AriesUnit = "soldiers";
export type AriesMark = "selectunit" | "selectmovetarget";
export type AriesCommand = "move";
export type AriesPhaseCommand = never;
export type AriesPhase = "startTurn" | AriesMark;
export type AriesUnitLayer = "soldiers" | "mysoldiers" | "neutralsoldiers" | "oppsoldiers";
export type AriesGenerator = "findmovetargets" | "findpushresults";
export type AriesArtifactLayer = "movetargets" | "beingpushed" | "squished";
export type AriesTerrainLayer = "corner" | "nocorner" | "mycorner" | "oppcorner";
export type AriesLayer = CommonLayer | AriesUnitLayer | AriesArtifactLayer | AriesTerrainLayer;
