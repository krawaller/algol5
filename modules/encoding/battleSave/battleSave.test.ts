import { AlgolBattleSave } from "../../types";
import { parseBattleSave, stringifyBattleSave } from ".";

type Test = {
  desc: string;
  save: AlgolBattleSave;
  method?: number;
};

const tests: Test[] = [
  {
    desc: "basic ongoing battlesave",
    save: {
      path: [1, 2, 3],
      player: 1,
      turn: 7,
      ended: false,
    },
  },
  {
    desc: "basic ended battlesave",
    save: {
      path: [1, 2, 3, 4, 5, 6],
      player: 0,
      turn: 75,
      ended: true,
    },
  },
];

describe("the parsing and stringification of AlgolLocalBattle", () => {
  for (const t of tests) {
    it(t.desc, () => {
      const str = stringifyBattleSave(t.save, t.method || 0);
      const result = parseBattleSave(str);
      expect(result).toEqual(t.save);
    });
  }
});
