import { MonkeyqueenDefinition } from "./_types";

const monkeyqueenVariants: MonkeyqueenDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      marks: ["j4"],
      potentialMarks: ["i4", "i5", "j5", "h6", "j6", "j7"],
      setup: {
        babies: {
          "1": ["g1", "j4"],
          "2": ["f3", "f12"],
        },
        queens: {
          "1": ["d4"],
          "2": ["i6"],
        },
      },
    },
  },
];

export default monkeyqueenVariants;
