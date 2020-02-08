import { icons } from "./stolenShapes";
import { getIconShape } from "./getIconShape";
import { getSplit } from "./getSplit";

export const allIcons: Record<string, string> = {};

const owners = [0, 1, 2] as const;

for (const icon of icons) {
  for (const owner of owners) {
    const def = getIconShape(icon, owner);
    allIcons[icon + owner] = def;
    for (const owner2 of owners) {
      if (owner2 > owner) {
        const def = getSplit(icon, owner, owner2);
        allIcons[icon + owner + owner2] = def;
      }
    }
  }
}
