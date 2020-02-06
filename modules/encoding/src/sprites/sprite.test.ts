import { stringifySprites, parseSprites } from ".";
import { AlgolSprite } from "../../../types";
import { sortSprites } from "../../../common/sprites/sprite.sort";

type Test = {
  desc: string;
  entities: AlgolSprite[];
};

const tests: Test[] = [
  {
    desc: "basic case",
    entities: [
      { pos: "d1", mark: "pot" },
      { pos: "e1", mark: "pot" },
      { pos: "f1", mark: "pot" },
      { pos: "d3", unit: { icon: "pawn", owner: 1 } },
      { pos: "b3", unit: { icon: "pawn", owner: 1 } },
      { pos: "c3", unit: { icon: "pawn", owner: 1 } },
      { pos: "f3", unit: { icon: "pawn", owner: 1 } },
      { pos: "e3", unit: { icon: "pawn", owner: 1 } },
      { pos: "a8", unit: { icon: "knight", owner: 2 }, mark: "mark" },
    ],
  },
];

describe("encoding board entities", () => {
  for (const t of tests) {
    const code = stringifySprites(t.entities);
    test(`Handled ${t.desc} via ${code}`, () => {
      expect(sortSprites(t.entities)).toEqual(sortSprites(parseSprites(code)));
    });
  }
});
