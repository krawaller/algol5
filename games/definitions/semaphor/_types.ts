export type SemaphorTerrain = never;
export type SemaphorUnit = "kings" | "pawns" | "bishops";
export type SemaphorMark = "selectdeploytarget" | "selectunit";
export type SemaphorCommand = "deploy" | "promote";
export type SemaphorPhaseCommand = never;
export type SemaphorPhase = "startTurn" | SemaphorMark;
