import { AlgolBattleSave } from "../../../types";
import { parseBattleSave, stringifyBattleSave } from ".";

type Test = {
  desc: string;
  save: AlgolBattleSave;
  method?: number;
};

const tests: Test[] = [
  {
    desc: "basic ongoing battlesave",
    method: 1,
    save: {
      path: [1, 2, 3],
      player: 1,
      turn: 7,
      ended: false,
      variantCode: "p",
      gameId: "allqueenschess",
    },
  },
  {
    desc: "basic ended battlesave",
    method: 1,
    save: {
      path: [1, 2, 3, 4, 5, 6],
      player: 0,
      turn: 75,
      ended: true,
      variantCode: "b",
      gameId: "aries",
    },
  },
];

describe("the parsing and stringification of AlgolSession", () => {
  for (const t of tests) {
    it(t.desc, () => {
      const str = stringifyBattleSave(t.save, t.method || 0);
      const result = parseBattleSave(str);
      expect(result).toEqual(t.save);
    });
  }
});
