import { DesdemonaDefinition } from "./_types";

const desdemonaVariants: DesdemonaDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        amazons: {
          1: ["b7", "c4"],
          2: ["a5", "d4"],
        },
        stones: {
          1: ["a3", "b4", "c6", "d5", "d6", "e4"],
          2: ["b5", "b6", "c5"],
        },
      },
      marks: ["d4"],
      potentialMarks: [
        "a1",
        "b2",
        "c3",
        "d1",
        "d2",
        "d3",
        "e3",
        "e5",
        "f2",
        "f6",
        "g1",
        "g7",
      ],
    },
  },
  {
    ruleset: "basic",
    board: "xl",
    setup: "xl",
    desc: "XL",
    code: "x",
  },
];

export default desdemonaVariants;
