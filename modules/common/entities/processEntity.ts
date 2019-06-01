import { pos2coords, coords2pos } from "..";
import {
  AlgolEntityAnon,
  isAlgolEntityDataHoleRect,
  isAlgolEntityDataRect,
  isAlgolEntityDataSites,
  isAlgolEntityHoleRect,
  isAlgolEntityRect,
  isAlgolEntitySites,
} from "../../types";

export type ProcessedEntity = {
  pos: string;
  x: number;
  y: number;
  [prop: string]: string | number;
};

export function processEntity(entity: AlgolEntityAnon): ProcessedEntity[] {
  if (typeof entity === "string") {
    return [
      {
        pos: entity,
        ...pos2coords(entity),
      },
    ];
  }
  if (isAlgolEntitySites(entity)) {
    return processEntity({ datasites: [{}, ...entity.sites] });
  }
  if (isAlgolEntityDataSites(entity)) {
    const {
      datasites: [blueprint, ...positions],
    } = entity;
    return positions.reduce(
      (mem, p) =>
        mem.concat({
          pos: p,
          ...pos2coords(p),
          ...blueprint,
        }),
      [] as ProcessedEntity[]
    );
  }
  if (isAlgolEntityRect(entity)) {
    return processEntity({ holerect: entity.rect });
  }
  if (isAlgolEntityRect(entity)) {
    const {
      rect: [bottomleftPos, toprightPos],
    } = entity;
    return processEntity({ dataholerect: [{}, bottomleftPos, toprightPos] });
  }
  if (isAlgolEntityHoleRect(entity)) {
    const {
      holerect: [bottomleftPos, toprightPos, ...holes],
    } = entity;
    return processEntity({
      dataholerect: [{}, bottomleftPos, toprightPos, ...holes],
    });
  }
  if (isAlgolEntityDataRect(entity)) {
    const {
      datarect: [blueprint, bottomleftPos, toprightPos],
    } = entity;
    return processEntity({
      dataholerect: [blueprint, bottomleftPos, toprightPos],
    });
  }
  if (isAlgolEntityDataHoleRect(entity)) {
    const {
      dataholerect: [blueprint, bottomleftPos, toprightPos, ...holes],
    } = entity;
    let positions = [];
    const bottomleft = pos2coords(bottomleftPos);
    const topright = pos2coords(toprightPos);
    for (let x = bottomleft.x; x <= topright.x; x++) {
      for (let y = bottomleft.y; y <= topright.y; y++) {
        positions.push(coords2pos({ x: x, y: y }));
      }
    }
    return positions
      .filter(p => holes.indexOf(p) === -1)
      .map(p => ({ pos: p, ...pos2coords(p), ...blueprint }));
  }
  return [];
}
