import { StoogesDefinition } from "./_types";

const stoogesVariants: StoogesDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        singles: {
          1: ["a3", "c1", "c5", "e2"],
          2: ["b2", "b3", "c2", "d1", "d2", "d5", "e3", "e4"],
        },
        doubles: {
          1: ["b4", "c3", "d4"],
          2: ["c4", "d3", "f3"],
        },
      },
      marks: ["d3"],
      potentialMarks: ["c2", "d2", "e3", "e4"],
    },
  },
];

export default stoogesVariants;
