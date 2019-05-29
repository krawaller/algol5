import { coords2pos } from "..";

test("coords2pos", () =>
  ([
    [{ x: 1, y: 1 }, "a1"],
    [{ x: 1, y: 3 }, "a3"],
    [{ x: 2, y: 4 }, "b4"],
    [{ x: 10, y: 11 }, "j11"]
  ] as const).forEach(([coords, expectedPos]) =>
    expect(coords2pos(coords)).toBe(expectedPos)
  ));
