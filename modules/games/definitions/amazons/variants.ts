import { AmazonsDefinition } from "./_types";

const amazonsVariantBook: AmazonsDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "f",
    arr: {
      marks: ["j4"],
      potentialMarks: [
        "g1",
        "j1",
        "h2",
        "j2",
        "i3",
        "j3",
        "i4",
        "i5",
        "j5",
        "h6",
        "j6",
        "g7",
        "j7",
        "f8",
        "j8",
        "j9",
        "j10",
      ],
      setup: {
        fires: {
          "0": [
            "e2",
            "d3",
            "b4",
            "h4",
            "c5",
            "d5",
            "b6",
            "c6",
            "g6",
            "b7",
            "b8",
            "b9",
            "h9",
          ],
        },
        amazons: {
          "1": ["f3", "b5", "d6", "e9"],
          "2": ["d4", "j4", "f6", "a9"],
        },
      },
    },
  },
];

export default amazonsVariantBook;
