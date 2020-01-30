import {
  solids,
  hollows,
  colours,
  svgPicSide,
  stolenShapeSide,
} from "../../picdata";
import { processPath } from "./processPath";

export const getIconShape = (icon: keyof typeof solids, owner: 0 | 1 | 2) => {
  const fillColor = colours[`player${owner}iconFill` as keyof typeof colours];
  const fillPath = processPath({
    path: solids[icon],
    fac: svgPicSide / stolenShapeSide,
  });
  const fill = `<path fill="${fillColor}" d="${fillPath}" />`;
  const strokeColor =
    colours[`player${owner}iconStroke` as keyof typeof colours];
  const strokePath = processPath({
    path: hollows[icon],
    fac: svgPicSide / stolenShapeSide,
  });
  const stroke = `<path fill="${strokeColor}" d="${strokePath}" />`;
  const name = `${icon}${owner}`;
  const def = `<g id="${name}">${fill}${stroke}</g>`;
  return def;
};
