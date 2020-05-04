import { AlgolOffsetBasic, AlgolBoardAnon } from "../../types";
import { parseOffset } from "./parseOffset";

const oneToEight = [1, 2, 3, 4, 5, 6, 7, 8];

export function makeRelativeDirs(board: AlgolBoardAnon) {
  const offsetDefs = (board.offsets || []).concat(board.offset || []);
  const offsets: AlgolOffsetBasic[] = offsetDefs.reduce(
    (mem, offset) => mem.concat(parseOffset(offset)),
    [] as AlgolOffsetBasic[]
  );
  const ret = oneToEight.reduce(
    (mem, dir) => ({
      ...mem,
      [dir]: oneToEight.reduce(
        (inner, rel) => ({
          ...inner,
          [rel]: oneToEight.concat(oneToEight)[rel - 2 + dir],
        }),
        {}
      ),
    }),
    {} as { [n: string]: { [n: string]: number | string } }
  );
  for (const offset of offsets) {
    const [dirs, forward, right] = offset;
    for (const offDir of dirs) {
      const offStr = `d${offDir}f${forward}r${right}`;
      ret[offStr] = {};
      for (const dir of oneToEight) {
        const relDir = ret[offDir][dir];
        const relStr = `d${relDir}f${forward}r${right}`;
        ret[offStr][dir] = relStr;
      }
    }
  }
  return ret;
}
