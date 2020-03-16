import { AlgolBoardAnon } from "../../types";
import { svgFrameSide, svgPicSide, colours } from "../sprites";
import { coords2pos } from "../../common";
import { getBounds } from "./getBounds";

type RenderFrameOpts = {
  board: AlgolBoardAnon;
  from: string;
  to: string;
};

export function renderFrame(opts: RenderFrameOpts) {
  const { board, from, to } = opts;
  const { height, width } = board;

  const { startCol, startRow, stopCol, stopRow } = getBounds({
    height,
    width,
    from,
    to,
    pad: true,
  });

  let frame = "";

  // edge background
  frame += `<rect x="0" y="0" width="${(width + 2) *
    svgPicSide}" height="${(height + 2) * svgPicSide}" fill="${
    colours.edge
  }" stroke="none" />`;

  for (let row = startRow; row <= stopRow; row++) {
    let drawY = (height - row + 1.5) * svgPicSide;
    if (row > 0 && row <= height) {
      // left side row numbers
      if (startCol === 0) {
        frame += svgText(svgPicSide - svgFrameSide / 2, drawY, 0.1, row);
      }
      // right side row numbers
      if (stopCol === width + 1) {
        frame += svgText(
          (width + 1) * svgPicSide + svgFrameSide / 2,
          drawY,
          0.1,
          row
        );
      }
    }
    for (let col = startCol; col <= stopCol; col++) {
      if (col > 0 && col <= width) {
        let drawX = col * svgPicSide;
        // top column names
        if (row === height + 1) {
          const colName = coords2pos({ x: col, y: 1 })[0].toUpperCase();
          frame += svgText(
            drawX + svgPicSide / 2,
            svgPicSide - svgFrameSide / 2,
            0.3,
            colName
          );
        }
        // bottom column names
        if (row === 0) {
          const colName = coords2pos({ x: col, y: 1 })[0].toUpperCase();
          frame += svgText(
            drawX + svgPicSide / 2,
            svgPicSide * (height + 1) + svgFrameSide / 2, //+ (3 * svgFrameSide) / 2,
            0.3,
            colName
          );
        }
      }
    }
  }
  return `<g font-weight="normal" font-family="fantasy">${frame}</g>`;
}

const svgText = (
  x: number,
  y: number,
  dyEm: number,
  content: string | number
) =>
  `<text x="${x}" y="${y}" fill="${colours.edgeText}" text-anchor="middle" dy="${dyEm}em">${content}</text>`;
