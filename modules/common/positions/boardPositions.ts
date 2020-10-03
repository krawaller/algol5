import { coords2pos } from "../";
import { AlgolBoardAnon } from "../../types";
import { processEntity } from "../entities";

export function boardPositions(board: AlgolBoardAnon) {
  const { height, width } = board;
  const ret = [];
  const holes = (board.holes || []).flatMap(processEntity).map(coords2pos);
  for (let y = 1; y <= height; y++) {
    for (let x = 1; x <= width; x++) {
      const pos = coords2pos({ x: x, y: y });
      if (!holes.includes(pos)) {
        ret.push(pos);
      }
    }
  }
  return ret.sort();
}
