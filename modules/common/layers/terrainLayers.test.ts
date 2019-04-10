import { BoardAnon } from "../../types";
import { terrainLayers } from "..";

type TerrainTest = {
  board: BoardAnon;
  expected: {
    [terrainName: string]: {
      [pos: string]: {
        x: number;
        y: number;
        pos: string;
        [prop: string]: string | number;
      };
    };
  };
  forPlayer?: 1 | 2;
};

const terrainTests: TerrainTest[] = [
  {
    board: { height: 2, width: 2, terrain: { knork: ["a1", "b2"] } },
    expected: {
      knork: { a1: { pos: "a1", x: 1, y: 1 }, b2: { pos: "b2", x: 2, y: 2 } },
      noknork: { a2: { pos: "a2", x: 1, y: 2 }, b1: { pos: "b1", x: 2, y: 1 } }
    }
  },
  {
    board: {
      height: 2,
      width: 2,
      terrain: { knork: { 1: ["a1", "b2"], 2: ["a2", "b1"] } }
    },
    forPlayer: 1,
    expected: {
      knork: {
        a1: { pos: "a1", x: 1, y: 1, owner: 1 },
        b2: { pos: "b2", x: 2, y: 2, owner: 1 },
        a2: { pos: "a2", x: 1, y: 2, owner: 2 },
        b1: { pos: "b1", x: 2, y: 1, owner: 2 }
      },
      myknork: {
        a1: { pos: "a1", x: 1, y: 1, owner: 1 },
        b2: { pos: "b2", x: 2, y: 2, owner: 1 }
      },
      oppknork: {
        a2: { pos: "a2", x: 1, y: 2, owner: 2 },
        b1: { pos: "b1", x: 2, y: 1, owner: 2 }
      },
      noknork: {}
    }
  }
];

test("terrainLayers", () => {
  terrainTests.forEach(({ board, forPlayer, expected }) =>
    expect(terrainLayers(board, forPlayer)).toEqual(expected)
  );
});
