export type AlgolGameBlob<
  ArtifactLayer,
  Board,
  Btlp,
  Btlv,
  Cmnd,
  Gen,
  Grid,
  Layer,
  Mrk,
  Phase,
  Pos,
  Ruleset,
  Setup,
  Terrain,
  Turnp,
  Turnv,
  Unit
> = {
  artifactLayer: ArtifactLayer;
  board: Board;
  btlp: Btlp;
  btlv: Btlv;
  cmnd: Cmnd;
  gen: Gen;
  grid: Grid;
  layer: Layer;
  mrk: Mrk;
  phase: Phase;
  pos: Pos;
  ruleset: Ruleset;
  setup: Setup;
  terrain: Terrain;
  turnp: Turnp;
  turnv: Turnv;
  unit: Unit;
};

type s = string;
export type AlgolGameBlobAnon = AlgolGameBlob<
  s,
  "basic" | s, // board
  s,
  s,
  s,
  s,
  s,
  s,
  s,
  s,
  "basic" | s, // rule
  "basic" | s, // setup
  s,
  s,
  s,
  s,
  s
>;

export type AlgolTestBlob = AlgolGameBlob<
  "myartifactlayer",
  "myboard" | "basic",
  "mybattlep",
  "mybattlev",
  "mycmnd",
  "mygen",
  "mygrid",
  "mylayer",
  "mymark",
  "myphase",
  "mypos",
  "myrule" | "basic",
  "mysetup" | "basic",
  "myterrain",
  "myturnp",
  "myturnv",
  "myunit"
>;
