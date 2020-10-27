import { PartisansDefinition } from "./_types";

const partisansVariants: PartisansDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        amazons: {
          1: ["d4", "d7", "g10", "j4"],
          2: ["a4", "d10", "e7", "g1"],
        },
        stones: {
          1: ["b4"],
          2: ["g9"],
        },
      },
      marks: ["e7"],
      potentialMarks: [
        "c5",
        "d6",
        "f8",
        "h10",
        "b10",
        "c9",
        "d8",
        "f6",
        "g5",
        "h4",
        "i3",
        "j2",
        "e10",
        "e9",
        "e8",
        "e6",
        "e5",
        "e4",
        "e3",
        "e2",
        "e1",
      ],
    },
  },
];

export default partisansVariants;
