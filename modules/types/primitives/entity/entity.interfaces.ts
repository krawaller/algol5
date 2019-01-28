type Data = { [idx: string]: number | string };

export interface AlgolEntitySites<Position extends string> {
  sites: Position[];
}

export interface AlgolEntityDataSites<Position extends string> {
  datasites: [Data, Position, ...Position[]];
}

export interface AlgolEntityRect<Position extends string> {
  rect: [Position, Position];
}

export interface AlgolEntityDataRect<Position extends string> {
  datarect: [Data, Position, Position];
}

export interface AlgolEntityHoleRect<Position extends string> {
  holerect: [Position, Position, Position, ...Position[]];
}

export interface AlgolEntityDataHoleRect<Position extends string> {
  dataholerect: [Data, Position, Position, Position, ...Position[]];
}
