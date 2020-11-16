import { DesdemonaDefinition } from "./_types";

const desdemonaVariants: DesdemonaDefinition["variants"] = [
  {
    ruleset: "border",
    board: "basic",
    setup: "basic",
    desc: "desdemona",
    code: "B",
    arr: {
      setup: {
        amazons: {
          "1": ["g10", "d4", "a7", "j4"],
          "2": ["a4", "d10", "g1", "d7"],
        },
        stones: {
          "1": ["e5", "f6"],
          "2": ["e6", "f5"],
        },
      },
      marks: ["d7"],
      potentialMarks: [
        "a10",
        "b9",
        "c8",
        "e6",
        "f5",
        "g4",
        "h3",
        "i2",
        "j1",
        "b7",
        "c7",
        "e7",
        "f7",
        "g7",
        "h7",
        "i7",
        "j7",
        "b5",
        "c6",
        "e8",
        "f9",
        "d5",
        "d6",
        "d8",
        "d9",
      ],
    },
  },
  {
    ruleset: "regular",
    board: "noborder",
    setup: "basic",
    desc: "cassio",
    code: "L",
  },
];

export default desdemonaVariants;
