import lib from "../../../games/dist/lib";
import { coords2pos, terrainLayers } from "../../../common";
import { allTiles, colours, svgPicSide } from "../../picdata";
import { tileAtPos } from "./tileAtPos";
import { AlgolSprite } from "../../../types";

const side = svgPicSide;

type MakeBoardInnerOpts = {
  gameId: string;
  sprites?: AlgolSprite[];
  from?: string;
  to?: string;
  offsetX?: number;
  offsetY?: number;
};

// TODO - dimensions

export function makeBoardInner(opts: MakeBoardInnerOpts) {
  const {
    gameId,
    sprites = [],
    from = "a1",
    to = "j10",
    offsetX = 0,
    offsetY = 0,
  } = opts;
  const def = lib[gameId];
  const { height, width, terrain } = def.board;
  const layers = terrainLayers(height, width, terrain!);
  const tilemap = def.graphics.tiles;

  let background = `<rect x="${offsetX}" y="${offsetY}" width="${side *
    width}" height="${side * height}" fill="${colours.empty}" stroke="none" />`;

  let squares = "";
  let defs = "";
  let used: Record<string, boolean> = {};

  for (let row = 1; row <= height; row++) {
    let drawY = offsetY + (height - row) * side;
    for (let col = 1; col <= width; col++) {
      let drawX = offsetX + (col - 1) * side;
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
