import { icons } from "./stolenShapes";
import { getIconShape } from "./getIconShape";

export const allIcons: Record<string, string> = {};

for (const icon of icons) {
  for (const owner of [0, 1, 2] as (0 | 1 | 2)[]) {
    const def = getIconShape(icon, owner);
    allIcons[icon + owner] = def;
  }
}
