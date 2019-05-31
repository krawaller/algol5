export type Graphics<
  Terrain extends string = string,
  Unit extends string = string
> = {
  icons: { [unit in Unit]: AlgolIcon };
  tiles: Partial<{ [terrain in Terrain]: any }>;
};

const algolIcons = {
  rook: 1,
  queen: 1,
  king: 1,
  bishop: 1,
  pawn: 1,
  knight: 1,
};

export function isAlgolIcon(str: string): str is AlgolIcon {
  return !!algolIcons[str as keyof typeof algolIcons];
}

export type AlgolIcon = keyof typeof algolIcons;
