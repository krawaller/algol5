export type GowiththefloeTerrain = "water";
export type GowiththefloeUnit = "seals" | "bears" | "holes";
export type GowiththefloeMark = "selectunit" | "selectmovetarget" | "selecteattarget";
export type GowiththefloeCommand = "move" | "eat";
export type GowiththefloePhase = "startTurn" | GowiththefloeCommand | GowiththefloeMark;
