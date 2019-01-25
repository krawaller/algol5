import * as test from "tape";
import { coords2pos } from "../";

test("coords2pos", t => {
  [
    [{ x: 1, y: 1 }, "a1"],
    [{ x: 1, y: 3 }, "a3"],
    [{ x: 2, y: 4 }, "b4"],
    [{ x: 10, y: 11 }, "j11"]
  ].forEach(([coords, expectedPos]) => {
    t.deepEqual(
      coords2pos(coords),
      expectedPos,
      `it turns ${JSON.stringify(coords)} to ${expectedPos}`
    );
  });
  t.end();
});
