export type GogolTerrain = "homerow" | "edges";
export type GogolUnit = "kings" | "soldiers";
export type GogolMark = "selectkingdeploy" | "selectunit" | "selectmovetarget" | "selectjumptarget";
export type GogolCommand = "deploy" | "move" | "jump";
export type GogolPhase = "startTurn" | GogolCommand | GogolMark;
