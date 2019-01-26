import { coords2pos } from "../";

export function boardPositions(board) {
  var ret = [];
  for (var y = 1; y <= board.height; y++) {
    for (var x = 1; x <= board.width; x++) {
      ret.push(coords2pos({ x: x, y: y }));
    }
  }
  return ret.sort();
}
