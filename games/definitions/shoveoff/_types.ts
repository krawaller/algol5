export type ShoveoffTerrain = "southedge" | "northedge" | "westedge" | "eastedge" | "edge";
export type ShoveoffUnit = "soldiers";
export type ShoveoffMark = "selectpushpoint";
export type ShoveoffCommand = "north" | "south" | "east" | "west";
export type ShoveoffPhase = "startTurn" | ShoveoffCommand | ShoveoffMark;
