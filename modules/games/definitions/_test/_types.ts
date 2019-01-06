import { CommonLayer } from '../../../types';

export type _testTerrain = "steps";
export type _testUnit = "stepsfirsts" | "blocksfirsts" | "defaultfirsts" | "noblocks" | "pawns";
export type _testMark = "selectunit" | "selectmark";
export type _testCommand = never;
export type _testPhaseCommand = never;
export type _testPhase = "startTurn" | _testMark;
export type _testUnitLayer = "stepsfirsts" | "mystepsfirsts" | "neutralstepsfirsts" | "oppstepsfirsts" | "blocksfirsts" | "myblocksfirsts" | "neutralblocksfirsts" | "oppblocksfirsts" | "defaultfirsts" | "mydefaultfirsts" | "neutraldefaultfirsts" | "oppdefaultfirsts" | "noblocks" | "mynoblocks" | "neutralnoblocks" | "oppnoblocks" | "pawns" | "mypawns" | "neutralpawns" | "opppawns";
export type _testGenerator = "stepsfirst" | "blocksfirst" | "defaultfirst" | "noblock";
export type _testArtifactLayer = "marks" | "blocks";
export type _testTerrainLayer = "steps" | "nosteps";
export type _testLayer = CommonLayer | _testUnitLayer | _testArtifactLayer | _testTerrainLayer;
