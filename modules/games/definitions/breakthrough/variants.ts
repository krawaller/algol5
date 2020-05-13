import { BreakthroughDefinition } from "./_types";

const breakthroughVariants: BreakthroughDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        soldiers: {
          1: [
            "b1",
            "b4",
            "c3",
            "c4",
            "d3",
            "d4",
            "e3",
            "e4",
            "f1",
            "f3",
            "f4",
            "g1",
            "g2",
            "h4",
          ],
          2: [
            "b5",
            "b6",
            "b7",
            "c5",
            "c7",
            "d5",
            "d6",
            "e5",
            "e6",
            "f5",
            "f6",
            "f8",
            "g4",
            "g7",
            "h5",
          ],
        },
      },
      marks: ["f4"],
      potentialMarks: ["e5", "g5"],
    },
  },
  {
    ruleset: "basic",
    board: "mini",
    setup: "mini",
    desc: "mini",
    code: "M",
    arr: {
      setup: {},
      marks: [],
      potentialMarks: [],
    },
  },
];

export default breakthroughVariants;
