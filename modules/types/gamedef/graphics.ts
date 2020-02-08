export type Graphics<
  Terrain extends string = string,
  Unit extends string = string
> = {
  icons: AlgolIconMap<Unit>;
  tiles: AlgolTileMap<Terrain>;
};

export const algolIcons = {
  rook: 1,
  queen: 1,
  king: 1,
  bishop: 1,
  pawn: 1,
  knight: 1,
};

export const icons = Object.keys(algolIcons);

export function isAlgolIcon(str: string): str is AlgolIcon {
  return !!algolIcons[str as keyof typeof algolIcons];
}

export type AlgolIcon = keyof typeof algolIcons;

export const algolTiles = {
  playercolour: 1,
  castle: 1,
  grass: 1,
  water: 1,
};

export function isAlgolTile(str: string): str is AlgolTile {
  return !!algolTiles[str as keyof typeof algolTiles];
}
export type AlgolTile = keyof typeof algolTiles;

export type AlgolIconMap<Unit extends string = string> = Record<
  Unit,
  AlgolIcon
>;
export type AlgolTileMap<Terrain extends string = string> = Partial<
  Record<Terrain, AlgolTile>
>;

export type AlgolGameGraphics = {
  height: number;
  width: number;
  icons: AlgolIconMap;
  dataURI: string;
};
