import { BombardmentDefinition } from "./_types";

const bombardmentVariants: BombardmentDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        rockets: {
          1: ["a2", "g2", "g5", "h1"],
          2: ["e4", "e8", "f6", "f8", "g8"],
        },
      },
      marks: ["e4"],
      potentialMarks: ["d3", "e3", "f3"],
    },
  },
];

export default bombardmentVariants;
