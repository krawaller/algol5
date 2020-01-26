import { sortSprites } from "./sprite.sort";
import { AlgolSprite } from "../../../types";

describe("the sortSprites encoding helper", () => {
  test("sorts by ascending y, ascending x", () => {
    const entities: AlgolSprite[] = [
      { pos: "c7" },
      { pos: "a10" },
      { pos: "c3" },
      { pos: "c1" },
      { pos: "a1" },
      { pos: "b4" },
    ];
    expect(sortSprites(entities)).toEqual([
      { pos: "a1" },
      { pos: "c1" },
      { pos: "c3" },
      { pos: "b4" },
      { pos: "c7" },
      { pos: "a10" },
    ]);
  });
});
