import { OutwitDefinition } from "./_types";

const outwitVariants: OutwitDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        soldiers: {
          1: ["a1", "b2", "c3", "d4", "f6", "g7", "h8", "i9"],
          2: ["b1", "c2", "d3", "e4", "g6", "h7", "i8", "j9"],
        },
        kings: {
          1: ["e5"],
          2: ["f5"],
        },
      },
      marks: ["d4"],
      potentialMarks: ["d9", "a4"],
    },
  },
];

export default outwitVariants;
