export type DaggersTerrain = "base";
export type DaggersUnit = "daggers" | "crowns";
export type DaggersMark = "selectunit" | "selectmovetarget";
export type DaggersCommand = "move";
export type DaggersPhase = "startTurn" | DaggersCommand | DaggersMark;
