import { svgPicSide, svgFrameSide } from "../sprites";
import formatXml from "xml-formatter";
import { renderFrame } from "./renderFrame";
import { AlgolSprite, AlgolBoardAnon, AlgolTileMap } from "../../types";
import { renderTilesAndIcons } from "./renderTilesAndIcons";
import { getBounds } from "./getBounds";

type RenderOpts = {
  board: AlgolBoardAnon;
  tileMap: AlgolTileMap;
  sprites?: AlgolSprite[];
  from?: string;
  to?: string;
  pad?: boolean;
};

export function render(opts: RenderOpts) {
  const { board, tileMap, from = "a1", to = "k14", pad = true } = opts;
  const { height, width } = board;

  const frame = renderFrame({ board, from, to });
  const inner = renderTilesAndIcons({ board, tileMap, from, to, pad });

  const { xStart, picWidth, picHeight, stopRow } = getBounds({
    height,
    width,
    from,
    to,
    pad,
  });

  const calcYstart =
    (height - stopRow + 1) * svgPicSide + (pad ? svgPicSide - svgFrameSide : 0);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${xStart} ${calcYstart} ${picWidth} ${picHeight}">${frame}${inner}</svg>`;

  return formatXml(svg);
}
