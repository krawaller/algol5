import { AlgolContent, AlgolIcon } from "../../";

export interface AlgolContentPos<Pos> {
  pos: Pos;
}

export interface AlgolContentUnit<Pos> {
  unit: [AlgolIcon, 0 | 1 | 2, Pos];
}

export interface AlgolContentUnitType {
  unittype: [AlgolIcon, 0 | 1 | 2];
}

export interface AlgolContentCmnd<Cmnd> {
  command: Cmnd;
}

export interface AlgolContentEndTurn {
  endTurn: string;
}

export interface AlgolContentText {
  text: string | number;
}

export interface AlgolContentLine<Cmnd, Pos> {
  line: AlgolContent<Cmnd, Pos>[];
}

export interface AlgolContentSelect {
  select: string;
}

export interface AlgolContentPlayer {
  player: 1 | 2;
}

export interface AlgolContentBold {
  bold: string;
}
