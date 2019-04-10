import { boardPositions } from "..";

test("boardPositions", () => {
  const board = { height: 2, width: 3 };
  const result = boardPositions(board);
  const expected = ["a1", "a2", "b1", "b2", "c1", "c2"];
  expect(result).toEqual(expected);
});
