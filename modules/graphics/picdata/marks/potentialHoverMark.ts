import { svgPicSide, colours } from "../_constants";
const at = svgPicSide / 2;
const radius = at * 0.84;
const width = at * 0.24;
const opacity = 0.6;

const lineStart = 0.4 * at;
const lineEnd = 0.8 * at;
const thick = width * 0.6;

const clr = colours.markPotentialHover;

const crossHairs = [
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1],
]
  .map(
    ([xfac, yfac]) =>
      `<line x1="${at + lineStart * xfac}" y1="${at +
        lineStart * yfac}" x2="${at + lineEnd * xfac}" y2="${at +
        lineEnd * yfac}" stroke="${clr}" stroke-width="${thick}" />`
  )
  .join("");

export const potentialHoverMark = `<g id="potentialHoverMark" >
  ${crossHairs}
  <circle cx="${at}" cy="${at}" r="${radius}" stroke-width="${width}" stroke="${clr}" stroke-opacity="${opacity}" fill="none"></circle>
</g>`;
