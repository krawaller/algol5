import { AmazonsDefinition } from "./_types";

const amazonsVariantBook: AmazonsDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "f",
    arr: {
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
