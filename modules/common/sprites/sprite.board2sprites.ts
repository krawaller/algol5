import { AlgolSprite, AlgolIconMap, AlgolArmy } from "../../types";
import { sortSprites } from "./sprite.sort";

type Board2SpritesOpts = {
  units: AlgolArmy;
  iconMap: AlgolIconMap;
  marks: string[];
  potentialMarks?: string[];
};

export const board2sprites = (opts: Board2SpritesOpts): AlgolSprite[] => {
  const entityByPos: Record<string, AlgolSprite> = {};
  const { units, iconMap, marks, potentialMarks = [] } = opts;
  for (const pos of potentialMarks) {
    entityByPos[pos] = { pos, mark: "pot" };
  }

  for (const pos of marks) {
    entityByPos[pos] = { pos, mark: "mark" };
  }
  for (const unit of Object.values(units)) {
    entityByPos[unit.pos] = {
      ...entityByPos[unit.pos],
      pos: unit.pos,
      unit: {
        icon: iconMap[unit.group],
        owner: unit.owner,
      },
    };
  }
  return sortSprites(Object.values(entityByPos));
};
