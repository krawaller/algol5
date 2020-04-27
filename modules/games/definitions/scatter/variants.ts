import { ScatterDefinition } from "./_types";

const scatterVariants: ScatterDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        kings: { 0: ["e1", "e2", "f1", "f2"] },
        pawns: {
          1: ["b1", "c2", "d1", "e4", "b6", "c5", "d5", "d6"],
          2: ["a3", "a4", "b2", "b4", "c3", "c4", "d4", "e3"],
        },
      },
      marks: ["b4"],
      potentialMarks: ["b3", "b5"],
    },
  },
];

export default scatterVariants;
