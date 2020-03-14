import { DescentDefinition } from "./_types";

const descentVariantBook: DescentDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "m",
    arr: {
      setup: {
        lvl3: {
          "0": ["a1", "c1", "d1", "a2", "d2", "a4", "d4"],
          "2": ["b1"],
        },
        lvl1: {
          "0": ["b2", "d3"],
          "1": ["c2"],
        },
        lvl0: {
          "0": ["a3"],
        },
        lvl2: {
          "1": ["b3", "c4"],
          "2": ["c3", "b4"],
        },
      },
    },
  },
];

export default descentVariantBook;
