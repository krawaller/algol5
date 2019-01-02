export type OrthokonTerrain = never;
export type OrthokonUnit = "soldiers";
export type OrthokonMark = "selectunit" | "selectmovetarget";
export type OrthokonCommand = "move";
export type OrthokonPhaseCommand = never;
export type OrthokonPhase = "startTurn" | OrthokonMark;
