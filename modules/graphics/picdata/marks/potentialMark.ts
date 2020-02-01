import { svgPicSide, colours } from "../_constants";
const at = svgPicSide / 2;
const radius = at * 0.84;
const width = at * 0.24;
const opacity = 0.6;
export const potentialMark = `<circle id="potentialMark" cx="${at}" cy="${at}" r="${radius}" stroke-width="${width}" stroke="${colours.markPotential}" stroke-opacity="${opacity}" fill="none"></circle>`;
