export type AlgolGameBlob<
  Btlp,
  Btlv,
  Cmnd,
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
  grid: Grid;
  layer: Layer;
  mrk: Mrk;
  ruleset: Ruleset;
  turnp: Turnp;
  turnv: Turnv;
  unit: Unit;
};

type s = string;
export type AlgolGameBlobAnon = AlgolGameBlob<s, s, s, s, s, s, s, s, s, s>;
