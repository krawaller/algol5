import { OrthokonDefinition } from "./_types";

const orthokonVariantBook: OrthokonDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "e",
    arr: {
      setup: {
        soldiers: {
          "1": ["c1", "b3", "b4", "d4"],
          "2": ["a2", "a3", "a4", "c4"],
        },
      },
    },
  },
];
export default orthokonVariantBook;
