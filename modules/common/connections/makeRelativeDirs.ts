import { AlgolOffset } from "../../types";
import { parseOffset } from "./parseOffset";

export function makeRelativeDirs(offsets: AlgolOffset[] = []) {
  offsets = offsets.reduce(
    (mem, offset) => mem.concat(parseOffset(offset)),
    [] as AlgolOffset[]
  );
  return [1, 2, 3, 4, 5, 6, 7, 8].reduce(
    (mem, dir) => ({
      ...mem,
      [dir]: [1, 2, 3, 4, 5, 6, 7, 8].reduce(
        (inner, rel) => ({
          ...inner,
          [rel]: [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8][rel - 2 + dir]
        }),
        {}
      )
    }),
    {}
  );
}
