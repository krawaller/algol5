type Test<D extends WithExpressionDeps> = {};

type MyTest = Test<{
  battlepos: "poop";
  battlevar: "scoop";
  command: "gnurp";
  grid: "glur";
  layer: "fkeo";
  mark: "kwadop";
  turnpos: "dowka";
  turnvar: "dwa";
}>;

// ---------------------------------- molecules ----------------------------------

export interface WithAiStuff
  extends WithAiArtifactLayer,
    WithAiAspect,
    WithAiBrain,
    WithAiGenerator,
    WithAiGrid,
    WithAiTerrain,
    WithAiTerrainLayer {}

export interface WithGameStuff
  extends WithBattlePos,
    WithBattleVar,
    WithCommand,
    WithGrid,
    WithLayer,
    WithMark,
    WithTurnPos,
    WithTurnVar {}

export interface WithEverything extends WithAiStuff, WithGameStuff {}

export interface WithExpressionDeps
  extends WithBattlePos,
    WithBattleVar,
    WithCommand,
    WithGrid,
    WithLayer,
    WithMark,
    WithTurnPos,
    WithTurnVar {}

// ---------------------------------- singles ----------------------------------

export interface WithAiArtifactLayer {
  aiartifactlayer: string;
}

export interface WithAiAspect {
  aiaspect: string;
}

export interface WithAiBrain {
  aibrain: string;
}

export interface WithAiGenerator {
  aigenerator: string;
}

export interface WithAiGrid {
  aigrid: string;
}

export interface WithAiTerrain {
  aiterrain: string;
}

export interface WithAiTerrainLayer {
  aiterrainlayer: string;
}

export interface WithBattlePos {
  battlepos: string;
}

export interface WithBattleVar {
  battlevar: string;
}

export interface WithCommand {
  command: string;
}

export interface WithGrid {
  grid: string;
}

export interface WithLayer {
  layer: string;
}

export interface WithMark {
  mark: string;
}

export interface WithTurnPos {
  turnpos: string;
}

export interface WithTurnVar {
  turnvar: string;
}
