import { ZoneshDefinition } from "./_types";

const zoneshVariants: ZoneshDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        soldiers: {
          1: ["a1", "a2", "a3", "a5", "b1", "b2", "c2", "c3", "d1", "e1"],
          2: ["c5", "c6", "d5", "e3", "e4", "e6", "f3", "f4", "f5", "f6"],
        },
      },
      marks: ["c3"],
      potentialMarks: ["b3", "b4", "c4", "d2", "d3", "d4"],
    },
  },
  {
    ruleset: "basic",
    board: "mini",
    setup: "mini",
    desc: "mini",
    code: "m",
    arr: {
      setup: {},
      marks: [],
      potentialMarks: [],
    },
  },
];

export default zoneshVariants;
