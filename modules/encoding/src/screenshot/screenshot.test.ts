import { AlgolScreenshot } from "../../../types";
import { parseScreenshot, stringifyScreenshot } from ".";

type Test = {
  desc: string;
  screenshot: AlgolScreenshot;
  method?: number;
};

const tests: Test[] = [
  {
    desc: "regular",
    screenshot: {
      units: {
        unit1: {
          group: "foo",
          id: "unit1",
          owner: 1,
          pos: "a1",
        },
      },
      marks: ["a2"],
      potentialMarks: [],
    },
  },
];

describe("the parsing and stringification of screenshots", () => {
  for (const t of tests) {
    it(t.desc, () => {
      const str = stringifyScreenshot(t.screenshot, t.method || 0);
      const result = parseScreenshot(str);
      expect(result).toEqual(t.screenshot);
    });
  }
});
