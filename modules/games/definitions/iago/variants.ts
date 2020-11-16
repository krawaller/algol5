import { IagoDefinition } from "./_types";

const iagoVariants: IagoDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        amazons: {
          "1": ["c6", "d1", "a7", "j4"],
          "2": ["c2", "d10", "g1", "j7"],
        },
        stones: {
          "1": ["e5", "f6"],
          "2": ["e6", "f5"],
        },
      },
      marks: ["c2"],
      potentialMarks: [
        "c1",
        "c3",
        "c4",
        "c5",
        "a2",
        "b2",
        "d2",
        "e2",
        "f2",
        "g2",
        "h2",
        "i2",
        "j2",
        "a4",
        "b3",
        "b1",
        "d3",
        "e4",
        "g6",
        "h7",
        "i8",
        "j9",
      ],
    },
  },
];

export default iagoVariants;
