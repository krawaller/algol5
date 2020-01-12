import { AlgolLocalBattle } from "../../../types";
import { parseSession, stringifySession } from ".";
import { parseBattleSave } from "./parseSession";
import { stringifyBattleSave } from "./stringifySession";
import { stringifyPath } from "./stringifySession/stringifyPath";

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
      type: "normal",
      id: "666",
      updated: 456,
      path: stringifyPath([1, 2, 3], 0),
      player: 1,
      turn: 7,
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
      const str = stringifySession(t.local, t.method || 0);
      const result = parseSession(str, t.local.id);
      expect(result).toEqual(t.local);
    });
  }
});
