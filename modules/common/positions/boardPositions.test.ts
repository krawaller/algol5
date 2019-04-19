import { boardPositions } from "..";

test("boardPositions", () => {
  const result = boardPositions(2, 3);
  const expected = ["a1", "a2", "b1", "b2", "c1", "c2"];
  expect(result).toEqual(expected);
});
