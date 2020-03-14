import { AriesDefinition } from "./_types";

const ariesVariantBook: AriesDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "e",
    arr: {
      marks: ["c7"],
      potentialMarks: ["c4", "c5", "c6", "a7", "b7", "d7", "e7", "c8"],
      setup: {
        soldiers: {
          "1": ["a1", "b1", "a2", "a3", "c3", "a4", "b4", "c7", "d8"],
          "2": ["g1", "b5", "f6", "h6", "e7", "f7", "h7", "f8", "h8"],
        },
      },
    },
  },
];

export default ariesVariantBook;
