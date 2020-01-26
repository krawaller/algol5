import { AlgolSprite, AlgolBoardState } from "../../../types";
import { emptyAnim } from "../../../common";

export const sprites2board = (sprites: AlgolSprite[]) => {
  const ret: AlgolBoardState = {
    marks: [],
    potentialMarks: [],
    units: {},
    anim: emptyAnim,
  };
  let unitCount = 0;
  for (const sprite of sprites) {
    if (sprite.mark === "mark") {
      ret.marks.push(sprite.pos);
    }
    if (sprite.mark === "pot") {
      ret.potentialMarks.push(sprite.pos);
    }
    if (sprite.unit) {
      const newUnitId = "unit" + ++unitCount;
      ret.units[newUnitId] = {
        id: newUnitId,
        group: "foo",
        icon: sprite.unit.icon,
        owner: sprite.unit.owner,
        pos: sprite.pos,
      };
    }
  }
  return ret;
};
