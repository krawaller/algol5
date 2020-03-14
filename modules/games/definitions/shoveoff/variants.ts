import { ShoveoffDefinition } from "./_types";

const shoveoffVariantBook: ShoveoffDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "a",
    arr: {
      marks: [],
      potentialMarks: ["a1", "c1", "d1", "d2", "a3", "a4", "b4", "c4", "d4"],
      setup: {
        soldiers: {
          "0": ["c1", "a2", "b2", "d3", "a4", "c4"],
          "1": ["a1", "d2", "a3", "c3", "b4"],
          "2": ["b1", "d1", "c2", "b3", "d4"],
        },
      },
    },
  },
];

export default shoveoffVariantBook;
