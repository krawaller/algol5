import { GekitaiDefinition } from "./_types";

const gekitaiVariantBook: GekitaiDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "u",
    arr: {
      marks: [],
      potentialMarks: [
        "b1",
        "c1",
        "d1",
        "e1",
        "f1",
        "b2",
        "c2",
        "e2",
        "f2",
        "a3",
        "b3",
        "d3",
        "e3",
        "f3",
        "a4",
        "b4",
        "c4",
        "d4",
        "f4",
        "a5",
        "b5",
        "d5",
        "e5",
        "a6",
        "b6",
        "c6",
        "d6",
        "e6",
        "f6",
      ],
      setup: {
        markers: {
          "1": ["a1", "d2", "c3"],
          "2": ["a2", "e4", "c5", "f5"],
        },
      },
    },
  },
];

export default gekitaiVariantBook;
