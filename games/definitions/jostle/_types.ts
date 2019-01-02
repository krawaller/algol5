export type JostleTerrain = never;
export type JostleUnit = "checkers";
export type JostleMark = "selectunit" | "selectmovetarget";
export type JostleCommand = "jostle";
export type JostlePhase = "startTurn" | JostleCommand | JostleMark;
