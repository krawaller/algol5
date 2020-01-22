import { AlgolLocalBattle, AlgolBattleSave } from "../../types";
import { parseTimestamp, stringifyTimestamp } from ".";

type Test = {
  desc: string;
  timestamp: number;
  expected?: number;
  method?: number;
};

const tests: Test[] = [
  {
    desc: "regular",
    timestamp: 1579671300000,
  },
  {
    desc: "exactness",
    timestamp: 1579671354321,
    expected: 1579671300000,
  },
];

describe("the parsing and stringification of timestamps", () => {
  for (const t of tests) {
    it(t.desc, () => {
      const str = stringifyTimestamp(t.timestamp, t.method || 0);
      const result = parseTimestamp(str);
      expect(result).toEqual(t.expected || t.timestamp);
    });
  }
});
