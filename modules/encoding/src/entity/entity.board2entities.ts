import {
  AlgolBoardState,
  AlgolBoardEntity,
  AlgolIconMap,
} from "../../../types";
import { sortEntities } from "./entity.sort";

export const board2entities = (
  board: AlgolBoardState,
  iconMap: AlgolIconMap
): AlgolBoardEntity[] => {
  const entityByPos: Record<string, AlgolBoardEntity> = {};
  for (const pos of board.potentialMarks) {
    entityByPos[pos] = { pos, mark: "pot" };
  }
  for (const pos of board.marks) {
    entityByPos[pos] = { pos, mark: "mark" };
  }
  for (const unit of Object.values(board.units)) {
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
