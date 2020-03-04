import { AlgolBoardBookAnon } from "../../types";
import { terrainLayerNamesForBook } from "..";

type TerrainTest = {
  book: AlgolBoardBookAnon;
  expected: string[];
};

const terrainTests: TerrainTest[] = [
  {
    book: {
      basic: { height: 2, width: 2, terrain: { knork: ["a1", "b2"] } },
      other: { height: 2, width: 2, terrain: { blork: ["a2"] } },
    },
    expected: ["knork", "noknork", "blork", "noblork"],
  },
];

test("terrainLayersForBook", () => {
  terrainTests.forEach(({ book, expected }) =>
    expect(terrainLayerNamesForBook(book)).toEqual(expected)
  );
});
