import { YonmoqueDefinition } from "./_types";

const yonmoqueVariants: YonmoqueDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        pawns: {
          2: ["a3"],
          1: ["b3", "c3", "c4"],
        },
        bishops: {
          2: ["b1", "d5"],
          1: ["d2", "e3"],
        },
      },
      marks: [],
      potentialMarks: [],
    },
  },
];

export default yonmoqueVariants;
