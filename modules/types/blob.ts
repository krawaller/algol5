export type AlgolGameBlob<
  Btlp,
  Btlv,
  Cmnd,
  Gen,
  Grid,
  Layer,
  Mrk,
  Ruleset,
  Turnp,
  Turnv,
  Unit
> = {
  btlp: Btlp;
  btlv: Btlv;
  cmnd: Cmnd;
  gen: Gen;
  grid: Grid;
  layer: Layer;
  mrk: Mrk;
  ruleset: Ruleset;
  turnp: Turnp;
  turnv: Turnv;
  unit: Unit;
};

type s = string;
export type AlgolGameBlobAnon = AlgolGameBlob<s, s, s, s, s, s, s, s, s, s, s>;
