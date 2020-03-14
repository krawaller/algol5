import { GowiththefloeDefinition } from "./_types";

const gowiththefloeVariantBook: GowiththefloeDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "s",
    arr: {
      marks: ["c7"],
      potentialMarks: ["a5", "c5", "e5", "c6", "d6", "c8", "d8"],
      setup: {
        holes: {
          "0": [
            "b2",
            "g2",
            "c3",
            "f3",
            "b4",
            "c4",
            "d4",
            "b6",
            "b7",
            "d7",
            "e7",
            "f7",
            "g7",
          ],
        },
        seals: {
          "1": ["d2", "b5"],
        },
        bears: {
          "2": ["e4", "c7"],
        },
      },
    },
  },
];

export default gowiththefloeVariantBook;
