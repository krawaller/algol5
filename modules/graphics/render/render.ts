import { svgPicSide, svgFrameSide } from "../sprites";
import formatXml from "xml-formatter";
import { renderFrame } from "./renderFrame";
import {
  AlgolSprite,
  AlgolBoardAnon,
  AlgolTileMap,
  AlgolGameBlobAnon,
} from "../../types";
import { renderTilesAndIcons } from "./renderTilesAndIcons";
import { getBounds } from "./getBounds";
import { renderGradient } from "./renderGradients";

type RenderOpts = {
  board: AlgolBoardAnon;
  tileMap: AlgolTileMap<AlgolGameBlobAnon>;
  sprites?: AlgolSprite[];
  from?: string;
  to?: string;
  pad?: boolean;
  definitionStrategy?: "inline" | "group";
};

export function render(opts: RenderOpts) {
  const {
    board,
    tileMap,
    from = "a1",
    to = "k14",
    pad = true,
    sprites,
    definitionStrategy = "group",
  } = opts;
  const { height, width } = board;

  const frame = renderFrame({ board, from, to });
  const inner = renderTilesAndIcons({
    board,
    tileMap,
    from,
    to,
    pad,
    sprites,
    definitionStrategy,
  });
  const gradients = renderGradient({ board, from, to, pad });

  const { xStart, picWidth, picHeight, stopRow } = getBounds({
    height,
    width,
    from,
    to,
    pad,
  });
  const calcYstart =
    (height - stopRow + 1) * svgPicSide + (pad ? svgPicSide - svgFrameSide : 0);

  const rand =
    "M" +
    Math.random()
      .toString()
      .slice(1);
  const content = gradients
    ? `<mask id="${rand}">${gradients}</mask><g mask="url(#${rand})">${frame}${inner}</g>`
    : `${frame}${inner}`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${xStart} ${calcYstart} ${picWidth} ${picHeight}">${content}</svg>`;

  return formatXml(svg, {});
}
