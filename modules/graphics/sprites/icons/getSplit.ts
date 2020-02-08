import { solids } from "./stolenShapes";
import { getIconShape } from "./getIconShape";

export const getSplit = (
  icon: keyof typeof solids,
  owner1: 0 | 1 | 2,
  owner2: 0 | 1 | 2
) => {
  const bottom = getIconShape(icon, owner1);
  const top = getIconShape(icon, owner2, true);
  const name = `${icon}${owner1}${owner2}`;
  const def = `<g id="${name}">${bottom}${top}</g>`;
  return def;
};
