import { makeRelativeDirs } from "./";
import { AlgolOffset } from "../../types";

type RelativeDirTest = {
  dir: number | string;
  rel: number;
  expected: number | string;
  offsets?: AlgolOffset[];
};

const relativeDirTests: RelativeDirTest[] = [
  { dir: 2, rel: 2, expected: 3 },
  { dir: 1, rel: 4, expected: 4 },
  //{ dir: "d1f2r0", rel: 2, expected: "df2r0" }
];

test("relativeDirs", () => {
  relativeDirTests.forEach(({ dir, rel, expected, offsets }) =>
    expect(
      makeRelativeDirs({ height: 1, width: 1, offsets })[dir][rel]
    ).toEqual(expected)
  );
});
