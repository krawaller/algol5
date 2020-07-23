import { SquavaDefinition } from "./_types";

const squavaVariants: SquavaDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        markers: {
          1: ["b2", "b4", "b5", "c4", "e2"],
          2: ["a1", "c3", "d3", "d4"],
        },
      },
      marks: ["b3"],
      potentialMarks: [],
    },
  },
];

export default squavaVariants;
