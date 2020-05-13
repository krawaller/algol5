import { DuckpondDefinition } from "./_types";

const duckpondVariants: DuckpondDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        ducks: {
          1: ["b2", "c2", "d3", "d5"],
          2: ["b3", "b5", "c4", "e2"],
        },
      },
      marks: ["b3"],
      potentialMarks: ["a2", "a3", "a4", "b1", "b4", "c3", "d1"],
    },
  },
];

export default duckpondVariants;
