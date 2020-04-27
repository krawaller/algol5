import { griddef2grid } from "..";
import { AlgolGrid } from "../../types";

test("griddef2grid", () => {
  const grid: AlgolGrid<2, 2> = [
    [1, 2],
    [3, 4],
  ];
  const expected = {
    a1: 3,
    a2: 1,
    b1: 4,
    b2: 2,
  };
  const result = griddef2grid(grid);
  expect(result).toEqual(expected);
});
