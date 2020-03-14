import { JostleDefinition } from "./_types";

const jostleVariantBook: JostleDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "w",
    arr: {
      setup: {
        checkers: {
          "1": [
            "f3",
            "h3",
            "c4",
            "d4",
            "h4",
            "d5",
            "e5",
            "h5",
            "c6",
            "f6",
            "g6",
            "i6",
            "e7",
            "b8",
            "e8",
            "g8",
          ],
          "2": [
            "g2",
            "d3",
            "e3",
            "e4",
            "f4",
            "i4",
            "c5",
            "g5",
            "d6",
            "e6",
            "c7",
            "f7",
            "h7",
            "d8",
            "f8",
            "h9",
          ],
        },
      },
    },
  },
];
export default jostleVariantBook;
