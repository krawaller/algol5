import { coords2pos } from "../";
import { AlgolBoardAnon } from "../../types";
import { processEntity } from "../entities";

export function boardHoles(board: AlgolBoardAnon) {
  return (board.holes || [])
    .flatMap(processEntity)
    .map(coords2pos)
    .sort();
}
