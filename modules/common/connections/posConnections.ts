import { offsetPos } from "../";

export function posConnections(pos, board) {
  return [1, 2, 3, 4, 5, 6, 7, 8].reduce(function(mem, dir) {
    var newpos = offsetPos(pos, dir, 1, 0, board);
    if (newpos) {
      mem[dir] = newpos;
    }
    // TODO - handle offsets better in here! :)
    return (board.offsets || []).reduce(function(innermem, [forward, right]) {
      var newpos = offsetPos(pos, dir, forward, right, board);
      if (newpos) {
        innermem[dir + "_" + forward + "_" + right] = newpos;
      }
      return innermem;
    }, mem);
  }, {});
}
