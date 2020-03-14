import { DuploDefinition } from "./_types";

const duploVariantBook: DuploDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "u",
    arr: {
      marks: ["c4"],
      potentialMarks: ["b3", "d3", "b5", "c6"],
      setup: {
        soldiers: {
          "0": ["e4", "d5", "e5"],
          "1": ["a1", "b2", "c3", "a4", "b4", "c4", "d4"],
          "2": ["g4", "f5", "d6", "e6", "d7", "e7", "d8"],
        },
      },
    },
  },
];
export default duploVariantBook;
