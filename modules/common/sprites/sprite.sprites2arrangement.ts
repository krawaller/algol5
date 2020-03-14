import {
  AlgolSprite,
  AlgolArrangement,
  AlgolGameBlobAnon,
  AlgolIconMap,
} from "../../types";

type Sprites2ArrangementOpts = {
  sprites: AlgolSprite[];
  iconMap: AlgolIconMap;
};

export const sprites2arrangement = (
  opts: Sprites2ArrangementOpts
): AlgolArrangement<AlgolGameBlobAnon> => {
  const { sprites, iconMap } = opts;
  const revMap = Object.fromEntries(
    Object.entries(iconMap).map(([group, icon]) => [icon, group])
  );
  const ret: AlgolArrangement<AlgolGameBlobAnon> = {
    marks: [],
    potentialMarks: [],
    setup: {},
  };
  for (const sprite of sprites) {
    const { mark, pos, unit } = sprite;
    if (mark === "mark") {
      ret.marks = ret.marks || [];
      ret.marks.push(pos);
    }
    if (mark === "pot") {
      ret.potentialMarks = ret.potentialMarks || [];
      ret.potentialMarks.push(pos);
    }
    if (unit) {
      const { icon, owner } = unit;
      const group = revMap[icon];
      ret.setup[group] = ret.setup[group] || {};
      ret.setup[group]![owner] = ret.setup[group]![owner] || [];
      ret.setup[group]![owner]!.push(pos);
    }
  }
  return ret;
};
