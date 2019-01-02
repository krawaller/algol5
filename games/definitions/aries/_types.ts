export type AriesTerrain = "corner";
export type AriesUnit = "soldiers";
export type AriesMark = "selectunit" | "selectmovetarget";
export type AriesCommand = "move";
export type AriesPhaseCommand = never;
export type AriesPhase = "startTurn" | AriesMark;
