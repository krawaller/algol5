import { AmbivalenteDefinition } from "./_types";

const ambivalenteVariants: AmbivalenteDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        pawns: {
          0: ["a6", "e6", "b2", "b3", "d3", "e1", "f2"],
          1: ["b5", "c3", "f1", "f5"],
          2: ["a5", "b1", "b6", "d6", "f6"],
        },
      },
      marks: [],
      potentialMarks: [
        "a1",
        "a2",
        "a3",
        "a4",
        "b4",
        "c1",
        "c2",
        "c4",
        "c5",
        "c6",
        "d1",
        "d2",
        "d4",
        "d5",
        "e2",
        "e3",
        "e4",
        "e5",
        "f3",
        "f4",
      ],
    },
  },
];

export default ambivalenteVariants;
