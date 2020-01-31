import { AlgolBoardAnon } from "../../../types";
import { svgFrameSide, svgPicSide, colours } from "../../picdata";
import { coords2pos } from "../../../common";

export function makeBoardFrame(board: AlgolBoardAnon) {
  const { height, width } = board;
  let frame = "";

  // edge background
  frame += `<rect x="0" y="0" width="${svgPicSide * width +
    svgFrameSide * 2}" height="${svgPicSide * height +
    svgFrameSide * 2}" fill="${colours.edge}" stroke="none" />`;

  for (let row = 1; row <= height; row++) {
    let drawY = svgFrameSide + (height - row) * svgPicSide;
    frame += svgText(
      svgFrameSide / 2,
      drawY + (3 * svgFrameSide) / 2,
      -0.4,
      row
    );
    frame += svgText(
      width * svgPicSide + (3 * svgFrameSide) / 2,
      drawY + (3 * svgFrameSide) / 2,
      -0.4,
      row
    );
    for (let col = 1; col <= width; col++) {
      let drawX = svgFrameSide + (col - 1) * svgPicSide;
      if (row === 1) {
        const colName = coords2pos({ x: col, y: 1 })[0].toUpperCase();
        frame += svgText(
          drawX + svgPicSide / 2,
          svgFrameSide / 2,
          0.3,
          colName
        );
        frame += svgText(
          drawX + svgPicSide / 2,
          svgPicSide * height + (3 * svgFrameSide) / 2,
          0.3,
          colName
        );
      }
    }
  }
  return frame;
}

const svgText = (
  x: number,
  y: number,
  dyEm: number,
  content: string | number
) =>
  `<text font-family="fantasy" x="${x}" y="${y}" fill="${colours.edgeText}" text-anchor="middle" dy="${dyEm}em">${content}</text>`;
