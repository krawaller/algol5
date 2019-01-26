import * as test from "tape";
import { boardPositions } from "../";

test("boardPositions", t => {
  const board = { height: 2, width: 3 };
  const result = boardPositions(board);
  const expected = ["a1", "a2", "b1", "b2", "c1", "c2"];
  t.deepEqual(
    result,
    expected,
    `Says that ${JSON.stringify(board)} has positions ${JSON.stringify(
      expected
    )}`
  );
  t.end();
});
