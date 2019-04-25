import lib from "../../../games/dist/lib";
import { colnumber2name, coords2pos, terrainLayers } from "../../../common";
import * as fs from "fs-extra";
import * as path from "path";

function tileAtPos(layers, tilemap, pos) {
  return Object.keys(tilemap).reduce(function(mem, name) {
    return layers[name][pos]
      ? tilemap[name] === "playercolour"
        ? { 1: "player1base", 2: "player2base" }[layers[name][pos].owner]
        : tilemap[name]
      : mem;
  }, "empty");
}

const side = 50;
const edge = 25;

const tileColors = {
  empty: "white",
  castle: "grey",
  grass: "green",
  water: "lightblue",
  player1base: "red",
  player2base: "blue"
};

const out = path.join(__dirname, "../../dist/svgBoards");

export async function makeSVGboard(gameId: string) {
  const def = lib[gameId];
  const { height, width, terrain } = def.board;
  const layers = terrainLayers(height, width, terrain);
  const tilemap = def.graphics.tiles;

  let ret = `  <rect x="0" y="0" width="${side * width +
    edge * 2}" height="${side * height + edge * 2}" fill="${
    tileColors.empty
  }" stroke="none" />\n`;

  for (let row = 1; row <= height; row++) {
    for (let col = 1; col <= width; col++) {
      let tile = tileAtPos(layers, tilemap, coords2pos({ x: col, y: row }));

      let isDark = !((col + (row % 2)) % 2);
      let drawY = edge + (height - row) * side;
      let drawX = edge + (col - 1) * side;
      if (tile !== "empty") {
        let color = tileColors[tile];
        ret += `  <rect x="${drawX}" y="${drawY}" width="${side}" height="${side}" fill="${color}"/>\n`;
      }
      if (isDark) {
        ret += `  <rect x="${drawX}" y="${drawY}" width="${side}" height="${side}" fill="black" fill-opacity="0.08"/>\n`;
      }
    }
  }

  ret = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${side * width +
    edge * 2} ${side * height + edge * 2}">
${ret}
</svg>`;

  await fs.ensureDir(out);
  await fs.writeFile(path.join(out, gameId + ".svg"), ret);
  console.log("Generated SVG board for", gameId);
}
