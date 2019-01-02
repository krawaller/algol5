export type SemaphorTerrain = never;
export type SemaphorUnit = "kings" | "pawns" | "bishops";
export type SemaphorMark = "selectdeploytarget" | "selectunit";
export type SemaphorCommand = "deploy" | "promote";
export type SemaphorPhase = "startTurn" | SemaphorCommand | SemaphorMark;
