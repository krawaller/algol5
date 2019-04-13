import { offsetPos } from "../";
import { AlgolBoardAnon, AlgolOffsetBasic, AlgolOffset } from "../../types";

function parseOffset(offset: AlgolOffset): AlgolOffsetBasic[] {
  if (Array.isArray(offset)) {
    const [dirs, forward, right] = offset;
    return [[parseDirs(dirs), forward, right]];
  }
  if (offset === "knight") {
    return parseOffset(["ortho", 2, 1]).concat(parseOffset(["ortho", 2, -1]));
  }
  throw new Error(`Unknown offset def: ${JSON.stringify(offset)}`);
}

function parseDirs(dirs) {
  if (Array.isArray(dirs)) return dirs;
  if (dirs === "ortho") return [1, 3, 5, 7];
  if (dirs === "diag") return [2, 4, 6, 8];
  if (dirs === "rose") return [1, 2, 3, 4, 5, 6, 7, 8];
  throw new Error(`Unknown offset dirs: ${JSON.stringify(dirs)}`);
}

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
    []
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
