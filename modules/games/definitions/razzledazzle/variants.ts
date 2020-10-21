import { RazzledazzleDefinition } from "./_types";

const razzledazzleVariants: RazzledazzleDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        carriers: {
          1: ["a4"],
          2: ["h4"],
        },
        receivers: {
          1: ["a2", "c5", "a5", "a6"],
          2: ["h2", "h3", "f6", "h6"],
        },
      },
      marks: ["a4"],
      potentialMarks: ["a2", "a5", "c4"],
    },
  },
];

export default razzledazzleVariants;
