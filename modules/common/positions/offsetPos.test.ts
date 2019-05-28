import { offsetPos } from "..";
import { AlgolBoardAnon } from "algol-types";

const testBoard: AlgolBoardAnon = { height: 3, width: 4 };

type OffsetTest = {
  pos: string;
  dir: number;
  forward: number;
  right: number;
  expected: string | false;
};

const offsetTests: OffsetTest[] = [
  { pos: "c1", dir: 8, forward: 1, right: 0, expected: "b2" },
  { pos: "c1", dir: 8, forward: 2, right: 0, expected: "a3" },
  { pos: "c1", dir: 8, forward: 3, right: 0, expected: false },
  { pos: "c1", dir: 7, forward: 1, right: 1, expected: "b2" }
];

test("offsetPos", () =>
  offsetTests.forEach(({ pos, dir, forward, right, expected }) =>
    expect(offsetPos(pos, dir, forward, right, testBoard)).toEqual(expected)
  ));
