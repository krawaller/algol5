import { colours, svgPicSide } from "..";
import { solids, hollows, stolenShapeSide } from "./stolenShapes";
import { processPath } from "./processPath";

const xShift = 1.08;

export const getIconShape = (
  icon: keyof typeof solids,
  owner: 0 | 1 | 2,
  hideLeft?: boolean
) => {
  const fillColor = colours[`player${owner}iconFill` as keyof typeof colours];
  const fillPath = processPath({
    path: solids[icon],
    fac: svgPicSide / stolenShapeSide,
    xShift,
  });
  const fill = `<path fill="${fillColor}" d="${fillPath}" />`;
  const strokeColor =
    colours[`player${owner}iconStroke` as keyof typeof colours];
  const strokePath = processPath({
    path: hollows[icon],
    fac: svgPicSide / stolenShapeSide,
    xShift,
  });
  const stroke = `<path fill="${strokeColor}" d="${strokePath}" />`;
  const name = `${icon}${owner}`;
  if (!hideLeft) {
    return `<g id="${name}">${fill}${stroke}</g>`;
  }
  const mask = `<mask id="rside"><rect x="${svgPicSide /
    2}" y="0" height="${svgPicSide}" width="${svgPicSide}" fill="white" /></mask>`;
  const def = `<g id="${name}H">${mask}<g mask="url(#rside)">${fill}${stroke}</g></g>`;
  return def;
};
