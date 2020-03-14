import { CoffeeDefinition } from "./_types";

const coffeeVariantBook: CoffeeDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "z",
    arr: {
      marks: [],
      potentialMarks: [],
      setup: {
        soldiers: {
          "0": ["b2", "b3", "b4", "b5"],
          "1": ["d1", "c3", "e5"],
          "2": ["b1", "e3", "d4"],
        },
      },
    },
  },
];

export default coffeeVariantBook;
