export type DuploTerrain = never;
export type DuploUnit = "soldiers";
export type DuploMark = "selectdeploy" | "selectunit" | "selecttarget";
export type DuploCommand = "deploy" | "expand";
export type DuploPhase = "startTurn" | DuploCommand | DuploMark;
