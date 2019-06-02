import {
  AlgolOffsetBasic,
  AlgolOffset,
  BasicDir,
  AlgolDirsInnerAnon,
} from "../../types";

export function parseOffset(offset: AlgolOffset): AlgolOffsetBasic[] {
  if (Array.isArray(offset)) {
    const [dirs, forward, right] = offset;
    return [[parseDirs(dirs), forward, right]];
  }
  if (offset === "knight") {
    return parseOffset(["ortho", 2, 1]).concat(parseOffset(["ortho", 2, -1]));
  }
  throw new Error(`Unknown offset def: ${JSON.stringify(offset)}`);
}

function parseDirs(dirs: AlgolDirsInnerAnon): BasicDir[] {
  if (Array.isArray(dirs)) return dirs;
  if (dirs === "ortho") return [1, 3, 5, 7];
  if (dirs === "diag") return [2, 4, 6, 8];
  if (dirs === "rose") return [1, 2, 3, 4, 5, 6, 7, 8];
  throw new Error(`Unknown offset dirs: ${JSON.stringify(dirs)}`);
}
