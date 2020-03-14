import { AlgolSprite, AlgolArrangement, AlgolGameBlobAnon } from "../../types";

export const sprites2arrangement = (
  sprites: AlgolSprite[]
): AlgolArrangement<AlgolGameBlobAnon> => {
  const ret: AlgolArrangement<AlgolGameBlobAnon> = {
    marks: [],
    potentialMarks: [],
    setup: {},
  };
  for (const sprite of sprites) {
    const { mark, pos, unit } = sprite;
    if (mark === "mark") {
      ret.marks.push(pos);
    }
    if (mark === "pot") {
      ret.potentialMarks.push(pos);
    }
    if (unit) {
      const { icon, owner } = unit;
      ret.setup[icon] = ret.setup[icon] || {};
      ret.setup[icon][owner] = ret.setup[icon][owner] || [];
      ret.setup[icon][owner].push(pos);
    }
  }
  return ret;
};
