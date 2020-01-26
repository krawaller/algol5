import { codes } from "./sprite.codes";
import { AlgolIcon } from "../../../types/gamedef";

describe("the sprite codes", () => {
  const allCodes = Object.values(codes);
  const icons: AlgolIcon[] = [
    "pawn",
    "bishop",
    "king",
    "knight",
    "queen",
    "rook",
  ];
  for (const icon of icons) {
    for (const owner of [0, 1, 2] as const) {
      for (const marked of ["none", "mark", "pot"]) {
        test(`contains [${icon}, ${owner}, ${marked}]`, () => {
          expect(allCodes).toContainEqual(["icon", icon, owner, marked]);
        });
      }
    }
  }
  for (const row of [2, 3, 4, 5, 6, 7, 8, 9, 10]) {
    test(`contains [row, ${row}]`, () => {
      expect(allCodes).toContainEqual(["row", row]);
    });
  }
  for (const row of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
    test(`contains [skip, ${row}]`, () => {
      expect(allCodes).toContainEqual(["skip", row]);
    });
  }
  for (const row of [2, 3, 4, 5, 6, 7, 8, 9]) {
    test(`contains [repeat, ${row}]`, () => {
      expect(allCodes).toContainEqual(["repeat", row]);
    });
  }
});
