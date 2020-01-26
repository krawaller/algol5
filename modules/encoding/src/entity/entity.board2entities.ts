import {
  AlgolBoardState,
  AlgolBoardEntity,
  AlgolIconMap,
  AlgolArmy,
} from "../../../types";
import { sortEntities } from "./entity.sort";

type Board2EntitiesOpts = {
  units: AlgolArmy;
  iconMap: AlgolIconMap;
  marks: string[];
  potentialMarks?: string[];
};

export const board2entities = (
  opts: Board2EntitiesOpts
): AlgolBoardEntity[] => {
  const entityByPos: Record<string, AlgolBoardEntity> = {};
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
  return sortEntities(Object.values(entityByPos));
};
