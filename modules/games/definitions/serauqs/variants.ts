import { SerauqsDefinition } from "./_types";

const serauqsVariantBook: SerauqsDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "c",
    arr: {
      marks: ["b3"],
      potentialMarks: ["a2", "c2", "b4", "c4"],
      setup: {
        soldiers: {
          "1": ["b1", "a3", "b3"],
          "2": ["b2", "c3", "d3"],
        },
        wild: {
          "1": ["c1"],
          "2": ["a4"],
        },
      },
    },
  },
];

export default serauqsVariantBook;
