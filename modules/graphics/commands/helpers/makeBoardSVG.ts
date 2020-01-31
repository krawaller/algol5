import fs from "fs-extra";
import path from "path";
import lib from "../../../games/dist/lib";
import { coords2pos, terrainLayers } from "../../../common";
import svgToMiniDataURI from "mini-svg-data-uri";
import { allTiles, colours, svgPicSide, svgFrameSide } from "../../picdata";
import formatXml from "xml-formatter";
import { tileAtPos } from "./tileAtPos";
import { makeBoardFrame } from "./makeBoardFrame";

const side = svgPicSide;
const edge = svgFrameSide;

const boardOut = path.join(__dirname, "../../dist/svgBoards");
const jsonOut = path.join(__dirname, "../../dist/svgDataURIs");

export async function makeBoardSVG(gameId: string) {
  const def = lib[gameId];
  const { height, width, terrain } = def.board;
  const layers = terrainLayers(height, width, terrain!);
  const tilemap = def.graphics.tiles;

  let ret = "";
  let frame = "";

  frame += makeBoardFrame(def.board);

  // empty background!
  frame += `<rect x="${edge}" y="${edge}" width="${side *
    width}" height="${side * height}" fill="${colours.empty}" stroke="none" />`;

  let squares = "";
  let defs = "";
  let used: Record<string, boolean> = {};

  for (let row = 1; row <= height; row++) {
    let drawY = edge + (height - row) * side;
    for (let col = 1; col <= width; col++) {
      let drawX = edge + (col - 1) * side;
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
  ret += `<defs>${defs}</defs><g>${frame}</g><g>${squares}</g>`;

  ret = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${side * width +
    edge * 2} ${side * height + edge * 2}">${ret}</svg>`;

  ret = formatXml(ret);

  await fs.ensureDir(boardOut);
  await fs.writeFile(path.join(boardOut, gameId + ".svg"), ret);
  await fs.ensureDir(jsonOut);
  await fs.writeFile(
    path.join(jsonOut, gameId + ".ts"),
    `import { AlgolGameGraphics } from "../../../types";\n` +
      `export const ${gameId}BoardGraphics: AlgolGameGraphics = ${JSON.stringify(
        {
          height,
          width,
          icons: def.graphics.icons,
          dataURI: svgToMiniDataURI(ret),
        },
        null,
        2
      )};\n` +
      `export default ${gameId}BoardGraphics\n`
  );
  console.log("Generated SVG board and JSON for", gameId);
}
