import lib from "../../../games/dist/lib";
import { coords2pos, terrainLayers } from "../../../common";
import { allTiles, colours, svgPicSide } from "../../picdata";
import { tileAtPos } from "./tileAtPos";
import { AlgolSprite } from "../../../types";
import { getBounds } from "./getBounds";

const side = svgPicSide;

type MakeBoardInnerOpts = {
  gameId: string;
  sprites?: AlgolSprite[];
  from: string;
  to: string;
  pad?: boolean;
};

export function makeBoardInner(opts: MakeBoardInnerOpts) {
  const { gameId, sprites = [], from, to, pad } = opts;
  const def = lib[gameId];
  const { height, width, terrain } = def.board;
  const layers = terrainLayers(height, width, terrain!);
  const tilemap = def.graphics.tiles;

  let squares = "";
  let defs = "";
  let used: Record<string, boolean> = {};

  const { startCol, startRow, stopCol, stopRow } = getBounds({
    height,
    width,
    from,
    to,
    pad,
  });

  const startY = (height - Math.min(stopRow, height) + 1) * side;
  let background = `<rect x="${Math.max(startCol, 1) *
    side}" y="${startY}" width="${(Math.min(stopCol, width) -
    Math.max(startCol, 1) +
    1) *
    side}" height="${(Math.min(stopRow, height) - Math.max(startRow, 1) + 1) *
    side}" fill="${colours.empty}" stroke="none" />`;

  for (
    let row = Math.max(startRow, 1);
    row <= Math.min(stopRow, height);
    row++
  ) {
    let drawY = (height - row + 1) * side;
    for (
      let col = Math.max(startCol, 1);
      col <= Math.min(stopCol, width);
      col++
    ) {
      let drawX = col * side;
      let tile = tileAtPos(layers, tilemap, coords2pos({ x: col, y: row }));
      let isDark = !((col + (row % 2)) % 2);
      if (!(tile === "empty" && !isDark)) {
        const id = tile + (isDark ? "Dark" : "");
        squares += `<use href="#${id}" x="${drawX}" y="${drawY}" />`;
        if (!used[id]) {
          used[id] = true;
          const pic = allTiles[id as keyof typeof allTiles];
          if (!pic) {
            throw new Error(`Unknown pic ${id}`);
          }
          defs += pic;
        }
      }
    }
  }

  return `<defs>${defs}</defs><g>${background}</g><g>${squares}</g>`;
}
