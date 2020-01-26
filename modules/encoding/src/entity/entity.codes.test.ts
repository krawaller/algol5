import { codes } from "./entity.codes";
import { AlgolIcon } from "../../../types/gamedef";

describe("the entity codes", () => {
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
});
