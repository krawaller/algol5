import { colname2number } from "../";

export function pos2coords(pos) {
  return {
    x: colname2number[pos[0]],
    y: parseInt(pos.substr(1))
  };
}
