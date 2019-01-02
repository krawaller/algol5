export type JostleTerrain = never;
export type JostleUnit = "checkers";
export type JostleMark = "selectunit" | "selectmovetarget";
export type JostleCommand = "jostle";
export type JostlePhaseCommand = never;
export type JostlePhase = "startTurn" | JostleMark;
