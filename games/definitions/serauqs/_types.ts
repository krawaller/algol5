export type SerauqsTerrain = "base" | "corners" | "middle";
export type SerauqsUnit = "soldiers" | "wild";
export type SerauqsMark = "selectunit" | "selectmovetarget";
export type SerauqsCommand = "promote" | "move";
export type SerauqsPhaseCommand = never;
export type SerauqsPhase = "startTurn" | SerauqsMark;
