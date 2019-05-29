import { offsetPos } from "../";
import { parseOffset } from "./parseOffset";
import { AlgolBoardAnon, AlgolOffsetBasic, AlgolOffset } from "../../types";

export function posConnections(pos, board: AlgolBoardAnon) {
  const ret = {};

  [1, 2, 3, 4, 5, 6, 7, 8].forEach(dir => {
    const newpos = offsetPos(pos, dir, 1, 0, board);
    if (newpos) {
      ret[dir] = newpos;
    }
  });

  let offsets = board.offsets || [];
  if (board.offset) offsets.push(board.offset);
  offsets = offsets.reduce(
    (mem, offset) => mem.concat(parseOffset(offset)),
    [] as AlgolOffset[]
  );

  offsets.forEach((offset: AlgolOffsetBasic) => {
    const [dirs, forward, right] = offset;
    dirs.forEach(dir => {
      const newpos = offsetPos(pos, dir, forward, right, board);
      if (newpos) {
        ret[`d${dir}f${forward}r${right}`] = newpos;
      }
    });
  });

  return ret;
}
