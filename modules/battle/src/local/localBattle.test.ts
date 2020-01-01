import { AlgolLocalBattle } from "../../../types";
import { parseLocalBattle, stringifyLocalBattle } from ".";

type Test = {
  desc: string;
  local: AlgolLocalBattle;
  method?: number;
};

const tests: Test[] = [
  {
    desc: "basic",
    local: {
      created: 123,
      id: "666",
      updated: 456,
      save: {
        player: 2,
        turn: 7,
        path: [1, 2, 3],
        endedBy: "flarp",
      },
      screenshot: {
        marks: [],
        units: {
          unit1: {
            group: "gnurps",
            id: "unit1",
            owner: 1,
            pos: "a1",
          },
        },
      },
    },
  },
];

describe("the parsing and stringification of AlgolLocalBattle", () => {
  for (const t of tests) {
    it(t.desc, () => {
      const str = stringifyLocalBattle(t.local, t.method || 0);
      const result = parseLocalBattle(str);
      expect(result).toEqual(t.local);
    });
  }
});
