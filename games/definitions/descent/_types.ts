export type DescentTerrain = never;
export type DescentUnit = "pawns" | "knights" | "rooks";
export type DescentMark = "selectunit" | "selectmovetarget" | "selectdigtarget";
export type DescentCommand = "move" | "dig";
export type DescentPhaseCommand = "move";
export type DescentPhase = "startTurn" | DescentMark | DescentPhaseCommand;
