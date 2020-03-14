import { MomentumDefinition } from "./_types";

const momentumVariantBook: MomentumDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "k",
    arr: {
      setup: {
        stones: {
          "1": ["a1", "c1", "e1", "c4", "b6", "c6"],
          "2": ["a2", "c3", "e3", "a4", "e5", "g6"],
        },
      },
    },
  },
];

export default momentumVariantBook;
