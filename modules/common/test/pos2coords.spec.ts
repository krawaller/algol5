import * as test from "tape";
import { pos2coords } from "../";

test("pos2coords", t => {
  [
    ["a1", { x: 1, y: 1 }],
    ["a3", { x: 1, y: 3 }],
    ["b4", { x: 2, y: 4 }],
    ["j11", { x: 10, y: 11 }]
  ].forEach(([pos, expectedCoords]) => {
    t.deepEqual(
      pos2coords(pos),
      expectedCoords,
      `it turns ${pos} to ${JSON.stringify(expectedCoords)}`
    );
  });
  t.end();
});
