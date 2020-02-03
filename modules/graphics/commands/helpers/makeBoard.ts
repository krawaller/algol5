import lib from "../../../games/dist/lib";
import { svgPicSide, svgFrameSide } from "../../picdata";
import formatXml from "xml-formatter";
import { makeBoardFrame } from "./makeBoardFrame";
import { AlgolSprite } from "../../../types";
import { makeBoardInner } from "./makeBoardInner";

const side = svgPicSide;
const edge = svgFrameSide;

type MakeBoardOpts = {
  gameId: string;
  sprites?: AlgolSprite[];
  from?: string;
  to?: string;
};

export function makeBoard(opts: MakeBoardOpts) {
  const { gameId } = opts;
  const def = lib[gameId];

  const frame = makeBoardFrame(def.board);
  const inner = makeBoardInner({
    ...opts,
    offsetX: edge,
    offsetY: edge,
  });

  // TODO - fix dimensions if from/to are set
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${side *
    def.board.width +
    edge * 2} ${side * def.board.height + edge * 2}">${frame}${inner}</svg>`;

  return formatXml(svg);
}
