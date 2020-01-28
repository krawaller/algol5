import lib from "../../../games/dist/lib";
import { coords2pos, terrainLayers } from "../../../common";
import { Layer, FullDefAnon } from "../../../types";
import * as fs from "fs-extra";
import * as path from "path";
import svgToMiniDataURI from "mini-svg-data-uri";
import { allPics } from "../../picdata";
import formatXml from "xml-formatter";

function tileAtPos(
  layers: { [name: string]: Layer },
  tilemap: FullDefAnon["graphics"]["tiles"],
  pos: string
) {
  return Object.keys(tilemap).reduce(function(mem, name) {
    return layers[name][pos]
      ? tilemap[name] === "playercolour"
        ? { 1: "player1base", 2: "player2base" }[
            layers[name][pos].owner as 1 | 2
          ]
        : tilemap[name]
      : mem;
  }, "empty");
}

const side = 50;
const edge = 25;

const tileColors = {
  empty: "bisque",
  castle: "grey",
  grass: "green",
  water: "lightblue",
  player1base: "red",
  player2base: "blue",
  edge: "saddlebrown",
};

const boardOut = path.join(__dirname, "../../dist/svgBoards");
const jsonOut = path.join(__dirname, "../../dist/svgDataURIs");

export async function makeSVG(gameId: string) {
  const def = lib[gameId];
  const { height, width, terrain } = def.board;
  const layers = terrainLayers(height, width, terrain!);
  const tilemap = def.graphics.tiles;

  let ret = "";
  let frame = "";

  // edge background
  frame += `<rect x="0" y="0" width="${side * width +
    edge * 2}" height="${side * height + edge * 2}" fill="${
    tileColors.edge
  }" stroke="none" />`;

  // empty background!
  frame += `<rect x="${edge}" y="${edge}" width="${side *
    width}" height="${side * height}" fill="${
    tileColors.empty
  }" stroke="none" />`;

  let squares = "";
  let defs = "";
  let used: Record<string, boolean> = {};

  for (let row = 1; row <= height; row++) {
    let drawY = edge + (height - row) * side;
    frame += `<text x="${edge / 2}" y="${drawY +
      (3 * edge) /
        2}" fill="white" text-anchor="middle" dy="-.4em">${row}</text>`;
    frame += `<text x="${width * side + (3 * edge) / 2}" y="${drawY +
      (3 * edge) /
        2}" fill="white" text-anchor="middle" dy="-.4em">${row}</text>`;
    for (let col = 1; col <= width; col++) {
      let drawX = edge + (col - 1) * side;
      if (row === 1) {
        const colName = coords2pos({ x: col, y: 1 })[0];
        frame += `<text x="${drawX + side / 2}" y="${edge /
          2}" fill="white" text-anchor="middle" dy="+.2em">${colName}</text>`;
        frame += `<text x="${drawX + side / 2}" y="${side * height +
          (3 * edge) /
            2}" fill="white" text-anchor="middle" dy="+.2em">${colName}</text>`;
      }
      let tile = tileAtPos(layers, tilemap, coords2pos({ x: col, y: row }));
      let isDark = !((col + (row % 2)) % 2);
      if (!(tile === "empty" && !isDark)) {
        const id = tile + (isDark ? "Dark" : "");
        squares += `<use href="#${id}" x="${drawX}" y="${drawY}" />`;
        if (!used[id]) {
          used[id] = true;
          const pic = allPics[id as keyof typeof allPics];
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
