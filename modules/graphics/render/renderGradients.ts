import { AlgolBoardAnon } from "../../types";
import { getBounds } from "./getBounds";
import { svgFrameSide, svgPicSide } from "../sprites";

type RenderGradientOpts = {
  board: AlgolBoardAnon;
  from: string;
  to: string;
  pad?: boolean;
};

const bottomGradient = `<linearGradient id="bottomGradient" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stop-color="white" stop-opacity="0"/>
<stop offset="100%" stop-color="white" stop-opacity="1"/>
</linearGradient>`.replace(/\n/g, "");

const topGradient = `<linearGradient id="topGradient" x1="0" x2="0" y1="1" y2="0">
<stop offset="0%" stop-color="white" stop-opacity="0"/>
<stop offset="100%" stop-color="white" stop-opacity="1"/>
</linearGradient>`.replace(/\n/g, "");

const rightGradient = `<linearGradient id="rightGradient" x1="0" x2="1" y1="0" y2="0">
<stop offset="0%" stop-color="white" stop-opacity="0"/>
<stop offset="100%" stop-color="white" stop-opacity="1"/>
</linearGradient>`.replace(/\n/g, "");

const leftGradient = `<linearGradient id="leftGradient" x1="1" x2="0" y1="0" y2="0">
<stop offset="0%" stop-color="white" stop-opacity="0"/>
<stop offset="100%" stop-color="white" stop-opacity="1"/>
</linearGradient>`.replace(/\n/g, "");

export function renderGradient(opts: RenderGradientOpts) {
  const { board, from, to, pad } = opts;
  const { height, width } = board;

  const {
    startRow,
    startCol,
    stopRow,
    stopCol,
    xStart,
    xEnd,
    yStart,
    yEnd,
    picHeight,
    picWidth,
  } = getBounds({
    height,
    width,
    from,
    to,
    pad: true,
  });
  if (!pad) {
    return "";
  }
  let defs = "";
  let grads = "";
  const bottomY =
    (height - stopRow + 1) * svgPicSide + (svgPicSide - svgFrameSide);
  if (startRow > 0) {
    defs += bottomGradient;
    grads += `<rect fill="url(#bottomGradient)" x="${xStart}" y="${bottomY +
      picHeight -
      svgFrameSide}" width="${xEnd - xStart}" height="${svgFrameSide}" />`;
  }
  if (stopCol - 1 < width) {
    defs += rightGradient;
    grads += `<rect fill="url(#rightGradient)" x="${xEnd -
      svgFrameSide}" y="${bottomY}" width="${svgFrameSide}" height="${picHeight}" />`;
  }
  if (stopRow - 1 < height) {
    defs += topGradient;
    grads += `<rect fill="url(#topGradient)" x="${xStart}" y="${bottomY}" width="${picWidth}" height="${svgFrameSide}" />`;
  }
  if (startCol > 0) {
    defs += leftGradient;
    grads += `<rect fill="url(#leftGradient)" x="${xStart}" y="${bottomY}" width="${svgFrameSide}" height="${picHeight}" />`;
  }
  return defs ? `<defs>${defs}</defs><g>${grads}</g>` : "";
}
