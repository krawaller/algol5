import { colnumber2name } from "../";

export function coords2pos(coords: { x: number; y: number }) {
  return colnumber2name[coords.x] + coords.y;
}
