import { BoardAnon } from "../../types";

// TODO - also work for offsets!
export function makeRelativeDirs(board: BoardAnon) {
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
