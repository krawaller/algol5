export type _testTerrain = "steps";
export type _testUnit = "stepsfirsts" | "blocksfirsts" | "defaultfirsts" | "noblocks" | "pawns";
export type _testMark = "selectunit" | "selectmark";
export type _testCommand = never;
export type _testPhase = "startTurn" | _testCommand | _testMark;
