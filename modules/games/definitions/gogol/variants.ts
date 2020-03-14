import { GogolDefinition } from "./_types";

const gogolVariantBook: GogolDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "d",
    arr: {
      setup: {
        soldiers: {
          "1": ["a1", "b1", "d1", "g1", "b3", "d3", "a4", "a5"],
          "2": ["c5", "c6", "d6", "f6", "b8", "d8", "f8", "h8"],
        },
        kings: {
          "1": ["f4"],
          "2": ["b5"],
        },
      },
    },
  },
];

export default gogolVariantBook;
