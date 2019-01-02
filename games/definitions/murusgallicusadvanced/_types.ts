export type MurusgallicusadvancedTerrain = "homerow";
export type MurusgallicusadvancedUnit = "towers" | "walls" | "catapults";
export type MurusgallicusadvancedMark = "selecttower" | "selectmove" | "selectkill" | "selectcatapult" | "selectfire";
export type MurusgallicusadvancedCommand = "move" | "kill" | "sacrifice" | "fire";
export type MurusgallicusadvancedPhaseCommand = never;
export type MurusgallicusadvancedPhase = "startTurn" | MurusgallicusadvancedMark;
