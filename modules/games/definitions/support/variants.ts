import { SupportDefinition } from "./_types";

const supportVariants: SupportDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        bases: {
          1: ["b7", "c2", "g8", "h3"],
          2: ["b3", "c8", "g2", "h7"],
        },
        soldiers: {
          2: ["g6", "h6", "i6"],
          1: ["d1", "d2", "e2"],
        },
      },
      marks: ["d1"],
      potentialMarks: [
        "b1",
        "b2",
        "c1",
        "c3",
        "d3",
        "e1",
        "e3",
        "f1",
        "f2",
        "f3",
      ],
    },
  },
];

export default supportVariants;
