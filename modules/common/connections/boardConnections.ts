import { boardPositions } from "../";
import { posConnections } from "./posConnections";
import { AlgolBoardAnon } from "../../types";

/*
Calculates the connections object
*/
export function boardConnections(board: AlgolBoardAnon) {
  return boardPositions(board).reduce(
    function(mem, pos) {
      mem[pos] = posConnections(pos, board);
      return mem;
    },
    { faux: {} } as { [idx: string]: { [dir: string]: string } }
  );
}
