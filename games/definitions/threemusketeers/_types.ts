export type ThreemusketeersTerrain = never;
export type ThreemusketeersUnit = "pawns" | "kings";
export type ThreemusketeersMark = "selectunit" | "selectmovetarget";
export type ThreemusketeersCommand = "move";
export type ThreemusketeersPhaseCommand = never;
export type ThreemusketeersPhase = "startTurn" | ThreemusketeersMark;
