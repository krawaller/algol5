import { boardLayers } from "..";

test("boardLayers", () => {
  const board = { height: 2, width: 3 };
  const result = boardLayers(board);
  const expected = {
    board: {
      a1: { x: 1, y: 1, colour: "dark", pos: "a1" },
      b1: { x: 2, y: 1, colour: "light", pos: "b1" },
      c1: { x: 3, y: 1, colour: "dark", pos: "c1" },
      a2: { x: 1, y: 2, colour: "light", pos: "a2" },
      b2: { x: 2, y: 2, colour: "dark", pos: "b2" },
      c2: { x: 3, y: 2, colour: "light", pos: "c2" }
    },
    light: {
      b1: { x: 2, y: 1, colour: "light", pos: "b1" },
      a2: { x: 1, y: 2, colour: "light", pos: "a2" },
      c2: { x: 3, y: 2, colour: "light", pos: "c2" }
    },
    dark: {
      a1: { x: 1, y: 1, colour: "dark", pos: "a1" },
      c1: { x: 3, y: 1, colour: "dark", pos: "c1" },
      b2: { x: 2, y: 2, colour: "dark", pos: "b2" }
    }
  };
  expect(result).toEqual(expected);
});
