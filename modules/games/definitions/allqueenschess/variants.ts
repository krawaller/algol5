import { AllqueenschessDefinition } from "./_types";

const allqueenschessVariants: AllqueenschessDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        queens: {
          1: ["a3", "b5", "c1", "c4", "d4", "d5"],
          2: ["b1", "c3", "c5", "d3", "e3"],
        },
      },
      marks: ["b1"],
      potentialMarks: ["a1", "a2", "c2", "b2", "b3", "b4"],
    },
  },
];

export default allqueenschessVariants;
