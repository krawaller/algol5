import { AlgolGameBlobAnon } from "../blob";

export type Graphics<Blob extends AlgolGameBlobAnon> = {
  icons: AlgolIconMap<Blob>;
  tiles: AlgolTileMap<Blob>;
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

export type AlgolIconMap<
  Blob extends AlgolGameBlobAnon = AlgolGameBlobAnon
> = Record<Blob["unit"], AlgolIcon>;
export type AlgolTileMap<Blob extends AlgolGameBlobAnon> = Partial<
  Record<Blob["terrain"], AlgolTile>
>;

export type AlgolGameGraphics = {
  icons: AlgolIconMap;
  boards: Record<
    string,
    {
      height: number;
      width: number;
      dataURI: string;
    }
  >;
};
