export * from "./explanation";
export * from "./primitives";
export * from "./gamedef";
export * from "./session";
export * from "./generated";
export * from "./suite";
export * from "./screenshot";
export * from "./_args";
export * from "./error";
export * from "./blob";

export type SaveData = {
  gameId: string;
  turnNumber: number;
  moveIndexes: number[];
  battleId: string;
  ended?: boolean;
};

export type Coords = {
  x: number;
  y: number;
};

export type Player = {
  type: string;
  name: string;
};

export type PositionList = {
  pos: string;
  coords: Coords;
}[];

export type FunctionName = string;

export type Layer = {
  [posname: string]: { [prop: string]: string | number }; // object with whatever props u want
};

export type LayerCollection = {
  [idx: string]: Layer;
};

// ------------------------ FROM NEW ------------------------

export type CommonLayer =
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "units"
  | "board"
  | "light"
  | "dark";

// ---------------------

export type Partial<T> = { [P in keyof T]?: T[P] };
