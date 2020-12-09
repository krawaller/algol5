import { offsetPos } from "../";
import { parseOffset } from "./parseOffset";
import { AlgolBoardAnon, AlgolOffsetBasic } from "../../types";

type Connections = { [dir: string]: string };

export function posConnections(
  pos: string,
  board: AlgolBoardAnon
): Connections {
  const ret: Connections = {};

  [1, 2, 3, 4, 5, 6, 7, 8].forEach(dir => {
    const newpos = offsetPos(pos, dir, 1, 0, board);
    if (newpos) {
      ret[dir] = newpos;
    }
  });

  const offsets = board.offsets || [];
  if (board.offset) offsets.push(board.offset);
  const parsedOffsets = offsets.reduce(
    (mem, offset) => mem.concat(parseOffset(offset)),
    [] as AlgolOffsetBasic[]
  );

  parsedOffsets.forEach((offset: AlgolOffsetBasic) => {
    const [dirs, forward, right] = offset;
    dirs.forEach(dir => {
      const newpos = offsetPos(pos, dir as number, forward, right, board);
      if (newpos) {
        ret[`d${dir}f${forward}r${right}`] = newpos;
      }
    });
  });

  return ret;
}
