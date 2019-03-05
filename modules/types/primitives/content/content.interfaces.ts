export interface AlgolContentPos<Pos> {
  pos: Pos;
}

export interface AlgolContentUnit<Unit> {
  unit: [Unit, 0 | 1 | 2];
}

export interface AlgolContentUnitPos<Pos, Unit> {
  unitpos: [Unit, 0 | 1 | 2, Pos];
}

export interface AlgolContentCmnd<Cmnd> {
  command: Cmnd;
}

export interface AlgolContentText {
  text: string;
}
