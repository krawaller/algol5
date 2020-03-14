import { UglyduckDefinition } from "./_types";

const uglyduckVariantBook: UglyduckDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "y",
    arr: {
      marks: ["b4"],
      potentialMarks: ["a3", "c3"],
      setup: {
        soldiers: {
          "1": ["c1", "d1", "b2", "b3"],
          "2": ["d3", "e3", "a4", "b4", "d5"],
        },
        kings: {
          "1": ["c5"],
        },
      },
    },
  },
];

export default uglyduckVariantBook;
