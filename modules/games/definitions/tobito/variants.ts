import { TobitoDefinition } from "./_types";

const tobitoVariants: TobitoDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        runners: {
          1: ["a1", "c3", "d1"],
          2: ["d3", "e2"],
        },
        finishers: {
          2: ["a3"],
        },
      },
      marks: ["c3"],
      potentialMarks: ["b2", "b3", "c2", "d2", "e3"],
    },
  },
  {
    ruleset: "basic",
    board: "basic",
    setup: "neutral",
    desc: "with neutral unit",
    code: "N",
  },
];

export default tobitoVariants;
