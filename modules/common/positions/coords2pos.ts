import { colnumber2name } from "../";

export function coords2pos(coords) {
  return colnumber2name[coords.x] + coords.y;
}
