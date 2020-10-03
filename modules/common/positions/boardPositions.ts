import { coords2pos } from "../";
import { AlgolBoardAnon } from "../../types";

export function boardPositions(board: AlgolBoardAnon) {
  const { height, width } = board;
  let ret = [];
  for (let y = 1; y <= height; y++) {
    for (let x = 1; x <= width; x++) {
      ret.push(coords2pos({ x: x, y: y }));
    }
  }
  return ret.sort();
}
