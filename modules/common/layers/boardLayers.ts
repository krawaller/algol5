import { AlgolBoardAnon, LayerCollection } from "../../types";
import { boardPositions, pos2coords } from "../";

/*
Calculates the three BOARD layers (board,light,dark) and returns them.
*/
export function boardLayers(board: AlgolBoardAnon) {
  return boardPositions(board).reduce(
    function(mem, pos) {
      const coords = pos2coords(pos);
      const colour = ["dark", "light"][(coords.x + (coords.y % 2)) % 2];
      mem.board[pos] = mem[colour][pos] = {
        colour: colour,
        x: coords.x,
        y: coords.y,
        pos: pos,
      };
      return mem;
    },
    { board: {}, light: {}, dark: {} } as LayerCollection
  );
}
