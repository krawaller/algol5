import { pos2coords } from "..";

test("pos2coords", () =>
  ([
    ["a1", { x: 1, y: 1 }],
    ["a3", { x: 1, y: 3 }],
    ["b4", { x: 2, y: 4 }],
    ["j11", { x: 10, y: 11 }],
    ["k12", { x: 11, y: 12 }],
    ["l12", { x: 12, y: 12 }],
    ["Z0", { x: 0, y: 0 }],
  ] as const).forEach(([pos, expectedCoords]) =>
    expect(pos2coords(pos)).toEqual(expectedCoords)
  ));
