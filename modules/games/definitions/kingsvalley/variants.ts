import { KingsvalleyDefinition } from "./_types";

const kingsvalleyVariants: KingsvalleyDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      marks: ["c1"],
      potentialMarks: ["b1", "b2", "c4", "e3"],
      setup: {
        soldiers: {
          1: ["a1", "b4", "d1", "d4"],
          2: ["a3", "a5", "d5", "e5"],
        },
        kings: {
          1: ["c5"],
          2: ["c1"],
        },
      },
    },
  },
  {
    ruleset: "basic",
    board: "basic",
    setup: "retrieve",
    desc: "retrieve",
    code: "e",
  },
  {
    ruleset: "basic",
    board: "labyrinth",
    setup: "labyrinth",
    desc: "labyrinth",
    code: "k",
  },
];

export default kingsvalleyVariants;
