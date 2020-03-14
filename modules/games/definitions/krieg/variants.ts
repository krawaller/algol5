import { KriegDefinition } from "./_types";

const kriegVariantBook: KriegDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "j",
    arr: {
      marks: ["a3"],
      potentialMarks: ["a2", "a4"],
      setup: {
        notfrozens: {
          "1": ["a3", "c3", "b4"],
          "2": ["b1", "d1", "c2"],
        },
        frozens: {
          "1": ["b3"],
          "2": ["d3"],
        },
      },
    },
  },
];

export default kriegVariantBook;
