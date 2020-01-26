import { sortEntities } from "./entity.sort";
import { AlgolBoardEntity } from "../../../types";

describe("the sortEntities encoding helper", () => {
  test("sorts by ascending y, ascending x", () => {
    const entities: AlgolBoardEntity[] = [
      { pos: "c7" },
      { pos: "a10" },
      { pos: "c3" },
      { pos: "c1" },
      { pos: "a1" },
      { pos: "b4" },
    ];
    expect(sortEntities(entities)).toEqual([
      { pos: "a1" },
      { pos: "c1" },
      { pos: "c3" },
      { pos: "b4" },
      { pos: "c7" },
      { pos: "a10" },
    ]);
  });
});
