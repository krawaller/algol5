export type KriegTerrain = "southeast" | "northwest" | "corners" | "bases";
export type KriegUnit = "notfrozens" | "frozens";
export type KriegMark = "selectunit" | "selectmove";
export type KriegCommand = "move";
export type KriegPhase = "startTurn" | KriegCommand | KriegMark;
