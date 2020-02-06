import lib from "../../games/dist/lib";
import { coords2pos, terrainLayers } from "../../common";
import { allTiles, colours, svgPicSide, allMarks, allIcons } from "../sprites";
import { tileAtPos } from "./tileAtPos";
import { AlgolSprite } from "../../types";
import { getBounds } from "./getBounds";

const side = svgPicSide;

type RenderTilesAndIconsOpts = {
  gameId: string;
  sprites?: AlgolSprite[];
  from: string;
  to: string;
  pad?: boolean;
};

export function renderTilesAndIcons(opts: RenderTilesAndIconsOpts) {
  const { gameId, from, to, pad, sprites = [] } = opts;
  const def = lib[gameId];
  const { height, width, terrain } = def.board;
  const layers = terrainLayers(height, width, terrain!);
  const tilemap = def.graphics.tiles;

  const spritesPerPos = sprites.reduce(
    (memo, sprite) => ({
      ...memo,
      [sprite.pos]: sprite,
    }),
    {} as Record<string, AlgolSprite>
  );

  let squares = "";
  let icons = "";
  let marks = "";
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
      const pos = coords2pos({ x: col, y: row });
      let tile = tileAtPos(layers, tilemap, pos);
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
      if (spritesPerPos[pos]) {
        const sprite = spritesPerPos[pos];
        if (sprite.unit) {
          const id = `${sprite.unit.icon}${sprite.unit.owner}`;
          if (!used[id]) {
            used[id] = true;
            const def = allIcons[id];
            defs += def;
          }
          icons += `<use href="#${id}" x="${drawX}" y="${drawY}" />`;
        }
        if (sprite.mark) {
          const name =
            sprite.mark === "mark"
              ? "selectedMark"
              : sprite.mark === "pot"
              ? "potentialMark"
              : ("foo" as keyof typeof allMarks);
          if (!used[name]) {
            used[name] = true;
            const def = allMarks[name];
            defs += def;
          }
          marks += `<use href="#${name}" x="${drawX}" y="${drawY}" />`;
        }
      }
    }
  }

  return `<defs>${defs}</defs><g>${background}</g><g>${squares}${marks}${icons}</g>`;
}
