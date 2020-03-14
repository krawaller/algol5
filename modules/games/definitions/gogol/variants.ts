import { GogolDefinition } from "./_types";

const gogolVariantBook: GogolDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "d",
    arr: {
      marks: ["b1"],
      potentialMarks: [
        "c1",
        "e1",
        "f1",
        "h1",
        "a2",
        "b2",
        "c2",
        "d2",
        "e2",
        "f2",
        "g2",
        "h2",
        "a3",
        "c3",
        "e3",
        "f3",
        "g3",
        "b4",
        "c4",
        "d4",
        "e4",
        "f4",
        "g4",
        "d5",
        "e5",
        "f5",
        "g5",
        "a6",
        "b6",
        "e6",
        "g6",
        "h6",
        "a7",
        "c7",
        "d7",
        "e7",
        "f7",
        "g7",
        "h7",
        "a8",
        "c8",
        "e8",
        "g8",
        "h8",
      ],
      setup: {
        soldiers: {
          "1": ["a1", "b1", "d1", "g1", "b3", "d3", "a4", "a5"],
          "2": ["c5", "c6", "d6", "f6", "b7", "b8", "d8", "f8"],
        },
        kings: {
          "1": ["h4"],
          "2": ["b5"],
        },
      },
    },
  },
];

export default gogolVariantBook;
