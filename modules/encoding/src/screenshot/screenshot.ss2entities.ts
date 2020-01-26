import {
  AlgolScreenshot,
  AlgolBoardEntity,
  AlgolIconMap,
} from "../../../types";

export const screenshot2entities = (
  screenshot: AlgolScreenshot,
  iconMap: AlgolIconMap
): AlgolBoardEntity[] => {
  const entityByPos: Record<string, AlgolBoardEntity> = {};
  for (const pos of screenshot.marks) {
    entityByPos[pos] = { pos, mark: true };
  }
  for (const unit of Object.values(screenshot.units)) {
    entityByPos[unit.pos] = {
      ...entityByPos[unit.pos],
      pos: unit.pos,
      unit: {
        icon: iconMap[unit.group],
        owner: unit.owner,
      },
    };
  }
  return Object.values(entityByPos).sort((e1, e2) =>
    e1.pos < e2.pos ? -1 : 1
  );
};
