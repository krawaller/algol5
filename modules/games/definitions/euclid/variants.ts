import { EuclidDefinition } from "./_types";

const euclidVariants: EuclidDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        kings: {
          1: ["h5"],
          2: ["d8"],
        },
        soldiers: {
          1: ["a2", "a3", "b2", "b3", "b4", "c3", "c4", "e2", "e4", "f1", "h2"],
          2: [
            "a4",
            "b8",
            "c8",
            "e6",
            "f5",
            "f6",
            "f7",
            "g3",
            "g6",
            "g7",
            "h6",
            "h7",
          ],
        },
      },
      marks: ["e2"],
      potentialMarks: ["c2", "d2", "e1", "e3", "f2", "g2"],
    },
  },
];

export default euclidVariants;
