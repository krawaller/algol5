export type AtriumTerrain = never;
export type AtriumUnit = "kings" | "queens";
export type AtriumMark = "selectunit" | "selectmovetarget";
export type AtriumCommand = "move";
export type AtriumPhase = "startTurn" | AtriumCommand | AtriumMark;
