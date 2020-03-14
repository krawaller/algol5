import { AtriumDefinition } from "./_types";

const atriumVariantBook: AtriumDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "x",
    arr: {
      marks: ["b2"],
      potentialMarks: ["a2", "c2"],
      setup: {
        kings: {
          "1": ["b2", "d2", "c4"],
          "2": ["b1", "d3", "b4"],
        },
        queens: {
          "1": ["d1", "b3", "d5"],
          "2": ["c3", "a4", "e4"],
        },
      },
    },
  },
];

export default atriumVariantBook;
