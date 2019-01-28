import * as test from "tape";
import { offsetPos } from "../";
import { BoardAnon } from "../../types";

const testBoard: BoardAnon = { height: 3, width: 4 };

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

test("offsetPos", t => {
  offsetTests.forEach(({ pos, dir, forward, right, expected }) =>
    t.equal(
      offsetPos(pos, dir, forward, right, testBoard),
      expected,
      `Offseting ${pos} ${forward} forward and ${right} right in dir ${dir} becomes ${expected}`
    )
  );
  t.end();
});
