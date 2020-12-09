import { AlgolSession } from "../../../types";
import { parseSession, stringifySession } from ".";

type Test = {
  desc: string;
  local: AlgolSession;
  method?: number;
};

const tests: Test[] = [
  {
    desc: "basic",
    local: {
      variantCode: "p",
      created: 1579671300000,
      type: "normal",
      id: "666",
      updated: 1579666300000,
      path: [1, 2, 3],
      player: 1,
      turn: 7,
      sprites: [{ pos: "a1", unit: { owner: 1, icon: "king" } }],
    },
  },
];

describe("the parsing and stringification of AlgolSession", () => {
  for (const t of tests) {
    it(t.desc, () => {
      const str = stringifySession(t.local, t.method || 0);
      const result = parseSession(str, t.local.id);
      expect(result).toEqual(t.local);
    });
  }
});
