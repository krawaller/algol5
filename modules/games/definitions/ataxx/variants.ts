import { AtaxxDefinition } from "./_types";

const ataxxVariants: AtaxxDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        microbes: {
          1: [
            "a1",
            "a2",
            "b1",
            "b2",
            "b6",
            "c1",
            "c2",
            "c3",
            "c6",
            "d1",
            "d2",
            "d3",
            "d4",
            "e1",
            "f3",
            "f4",
            "g1",
            "g2",
          ],
          2: [
            "a3",
            "a4",
            "b3",
            "b4",
            "b5",
            "c4",
            "c5",
            "d5",
            "d6",
            "e2",
            "e3",
            "e4",
            "e5",
            "e6",
            "f1",
            "f2",
            "f5",
            "g3",
            "g4",
            "g5",
          ],
        },
      },
      marks: ["b5"],
      potentialMarks: ["a5", "a6", "a7", "b7", "c7", "d7"],
    },
  },
];

export default ataxxVariants;
