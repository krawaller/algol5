export type Graphics<
  Terrain extends string = string,
  Unit extends string = string
> = {
  icons: { [unit in Unit]: AlgolIcon };
  tiles: Partial<{ [terrain in Terrain]: any }>;
};

export type AlgolIcon =
  | "rook"
  | "queen"
  | "king"
  | "bishop"
  | "pawn"
  | "knight";
