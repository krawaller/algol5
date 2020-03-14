import { TransetDefinition } from "./_types";

const transetVariantBook: TransetDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      marks: ["c5"],
      potentialMarks: ["d3", "a4", "b4", "c4", "d4", "b5"],
      setup: {
        piokers: {
          "1": ["b1", "e2"],
          "2": ["d3", "b5"],
        },
        pinets: {
          "1": ["e1", "a2"],
          "2": ["a4", "e5"],
        },
        piases: {
          "1": ["c3"],
          "2": ["c5"],
        },
      },
    },
  },
];

export default transetVariantBook;
