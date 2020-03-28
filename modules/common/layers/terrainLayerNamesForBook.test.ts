import { AlgolBoardBookAnon } from "../../types";
import { terrainLayerNamesForBook } from "..";

type TerrainTest = {
  book: AlgolBoardBookAnon;
  expected: string[];
};

const two = (2 as unknown) as 3;

const terrainTests: TerrainTest[] = [
  {
    book: {
      basic: {
        height: two,
        width: two,
        terrain: { knork: ["a1", "b2"] },
      },
      other: { height: two, width: two, terrain: { blork: ["a2"] } },
    },
    expected: ["knork", "noknork", "blork", "noblork"],
  },
];

test("terrainLayersForBook", () => {
  terrainTests.forEach(({ book, expected }) =>
    expect(terrainLayerNamesForBook(book)).toEqual(expected)
  );
});
