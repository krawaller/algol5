import { boardPositions } from "../";
import { posConnections } from "./posConnections";
import { AlgolBoardAnon } from "algol-types";

/*
Calculates the connections object
*/
export function boardConnections(board: AlgolBoardAnon) {
  return boardPositions(board.height, board.width).reduce(
    function(mem, pos) {
      mem[pos] = posConnections(pos, board);
      return mem;
    },
    { faux: {} }
  );
}
