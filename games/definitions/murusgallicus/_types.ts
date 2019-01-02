export type MurusgallicusTerrain = "homerow";
export type MurusgallicusUnit = "towers" | "walls";
export type MurusgallicusMark = "selecttower" | "selectmove" | "selectkill";
export type MurusgallicusCommand = "move" | "kill";
export type MurusgallicusPhase = "startTurn" | MurusgallicusCommand | MurusgallicusMark;
