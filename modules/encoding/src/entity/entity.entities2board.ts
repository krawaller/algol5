import { AlgolBoardEntity, AlgolBoardState } from "../../../types";
import { emptyAnim } from "../../../common";

export const entities2board = (entities: AlgolBoardEntity[]) => {
  const ret: AlgolBoardState = {
    marks: [],
    potentialMarks: [],
    units: {},
    anim: emptyAnim,
  };
  let unitCount = 0;
  for (const entity of entities) {
    if (entity.mark === "mark") {
      ret.marks.push(entity.pos);
    }
    if (entity.mark === "pot") {
      ret.potentialMarks.push(entity.pos);
    }
    if (entity.unit) {
      const newUnitId = "unit" + ++unitCount;
      ret.units[newUnitId] = {
        id: newUnitId,
        group: "foo",
        icon: entity.unit.icon,
        owner: entity.unit.owner,
        pos: entity.pos,
      };
    }
  }
  return ret;
};
