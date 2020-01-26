import { AlgolBoardEntity, AlgolScreenshot } from "../../../types";

export const entities2screenshot = (entities: AlgolBoardEntity[]) => {
  const screenshot: AlgolScreenshot = {
    units: {},
    marks: [],
  };
  let unitCount = 0;
  for (const entity of entities) {
    if (entity.mark) {
      screenshot.marks.push(entity.pos);
    }
    if (entity.unit) {
      const unitId = `unit${++unitCount}`;
      screenshot.units[unitId] = {
        id: unitId,
        group: "foo", // this doesn't matter for the Screenshot
        pos: entity.pos,
        icon: entity.unit.icon,
        owner: entity.unit.owner,
      };
    }
  }
  return screenshot;
};
