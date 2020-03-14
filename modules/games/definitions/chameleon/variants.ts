import { ChameleonDefinition } from "./_types";

const chameleonVariantBook: ChameleonDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "w",
    arr: {
      marks: ["d4"],
      potentialMarks: [
        "a1",
        "b2",
        "c3",
        "d3",
        "e3",
        "c4",
        "e4",
        "c5",
        "d5",
        "e5",
      ],
      setup: {
        knights: {
          "1": ["a1", "c4"],
          "2": ["b4", "a5"],
        },
        bishops: {
          "1": ["c2", "d2"],
          "2": ["d4"],
        },
      },
    },
  },
];

export default chameleonVariantBook;
