import { pos2coords } from "../../../common";
import { svgPicSide, svgFrameSide } from "../../picdata";

const side = svgPicSide;
const edge = svgFrameSide;

type GetBoundsboxOpts = {
  width: number;
  height: number;
  from: string;
  to: string;
  pad?: boolean;
};

export const getBounds = (opts: GetBoundsboxOpts) => {
  const { width, height, from, to, pad } = opts;
  const padSize = pad ? 1 : 0;
  const start = pos2coords(from);
  const stop = pos2coords(to);

  const startRow = Math.max(0, start.y - padSize);
  const stopRow = Math.min(height + padSize, stop.y + padSize);
  const startCol = Math.max(0, start.x - padSize);
  const stopCol = Math.min(width + padSize, stop.x + padSize);

  const megaHeight = side * height + (pad ? edge * 2 : 0);
  let xStart = startCol * side;
  let xEnd = side * (stopCol + 1);
  let yStart = startRow * side;
  let yEnd = side * (stopRow + 1);
  if (pad) {
    xStart += side - edge;
    xEnd -= side - edge;
    yStart += side - edge;
    yEnd -= side - edge;
  }
  const picWidth = xEnd - xStart;
  const picHeight = yEnd - yStart;

  return {
    startRow,
    stopRow,
    startCol,
    stopCol,
    xStart,
    xEnd,
    yStart,
    megaHeight,
    yEnd,
    picWidth,
    picHeight,
  };
};
