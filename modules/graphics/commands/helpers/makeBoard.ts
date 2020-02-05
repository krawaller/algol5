import lib from "../../../games/dist/lib";
import { svgPicSide, svgFrameSide } from "../../picdata";
import formatXml from "xml-formatter";
import { makeBoardFrame } from "./makeBoardFrame";
import { AlgolSprite } from "../../../types";
import { makeBoardInner } from "./makeBoardInner";
import { getBounds } from "./getBounds";

const edge = svgFrameSide;

type MakeBoardOpts = {
  gameId: string;
  sprites?: AlgolSprite[];
  from?: string;
  to?: string;
  pad?: boolean;
};

export function makeBoard(opts: MakeBoardOpts) {
  const { gameId, from = "a1", to = "h7", pad = true } = opts;
  const def = lib[gameId];
  const { height, width } = def.board;

  const frame = makeBoardFrame({ board: def.board, from, to });
  const inner = makeBoardInner({ gameId, from, to, pad });

  const {
    xStart,
    yStart,
    xEnd,
    yEnd,
    picWidth,
    picHeight,
    startCol,
    startRow,
    stopCol,
    stopRow,
  } = getBounds({
    height,
    width,
    from,
    to,
    pad,
  });

  const calcYstart =
    (height - stopRow + 1) * svgPicSide + (pad ? svgPicSide - svgFrameSide : 0);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${xStart} ${calcYstart} ${picWidth} ${picHeight}">${frame}${inner}</svg>`;
  //const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${0} ${0} ${800} ${800}">${frame}${inner}</svg>`;

  return formatXml(svg);
}
