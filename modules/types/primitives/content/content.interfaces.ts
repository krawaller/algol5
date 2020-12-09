import { AlgolContent, AlgolIcon } from "../../";

export type AlgolContentPos<Pos> = {
  pos: Pos;
};

export type AlgolContentUnit<Pos> = {
  unit: [AlgolIcon, 0 | 1 | 2 | 12 | "01" | "02", Pos];
};

export type AlgolContentUnitType = {
  unittype: [AlgolIcon, 0 | 1 | 2 | 12 | "01" | "02"];
};

export type AlgolContentCmnd<Cmnd> = {
  command: Cmnd;
};

export type AlgolContentEndTurn = {
  endTurn: string;
};

export type AlgolContentText = {
  text: string | number;
};

export type AlgolContentLine<Cmnd, Pos> = {
  line: AlgolContent<Cmnd, Pos>[];
};

export type AlgolContentSelect = {
  select: string;
};

export type AlgolContentPlayer = {
  player: 0 | 1 | 2;
};

export type AlgolContentBold = {
  bold: string;
};
