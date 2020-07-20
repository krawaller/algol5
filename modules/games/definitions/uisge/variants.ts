import { UisgeDefinition } from "./_types";

const uisgeVariants: UisgeDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        kings: {
          1: ["b3", "c2"],
          2: ["b5"],
        },
        soldiers: {
          1: ["c3", "d2", "e3", "f3"],
          2: ["b4", "c4", "c5", "d4", "e4"],
        },
      },
      marks: ["b5"],
      potentialMarks: ["a4", "c6", "d5"],
    },
  },
];

export default uisgeVariants;
