import { BoardAnon } from "../../types";
import { coords2pos } from "../";

export function boardPositions(board: BoardAnon) {
  let ret = [];
  for (let y = 1; y <= board.height; y++) {
    for (let x = 1; x <= board.width; x++) {
      ret.push(coords2pos({ x: x, y: y }));
    }
  }
  return ret.sort();
}
