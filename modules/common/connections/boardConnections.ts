import { boardPositions, posConnections } from "../";

/*
Calculates the connections object
*/
export function boardConnections(board) {
  return boardPositions(board).reduce(
    function(mem, pos) {
      mem[pos] = posConnections(pos, board);
      return mem;
    },
    { faux: {} }
  );
}
