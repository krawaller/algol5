import lib from "../../games/dist/lib";
import { svgPicSide, svgFrameSide } from "../sprites";
import formatXml from "xml-formatter";
import { renderFrame } from "./renderFrame";
import { AlgolSprite } from "../../types";
import { renderTilesAndIcons } from "./renderTilesAndIcons";
import { getBounds } from "./getBounds";

type RenderOpts = {
  gameId: string;
  sprites?: AlgolSprite[];
  from?: string;
  to?: string;
  pad?: boolean;
};

export function render(opts: RenderOpts) {
  const { gameId, from = "a1", to = "k14", pad = true } = opts;
  const def = lib[gameId];
  const { height, width } = def.board;

  const frame = renderFrame({ board: def.board, from, to });
  const inner = renderTilesAndIcons({ gameId, from, to, pad });

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
