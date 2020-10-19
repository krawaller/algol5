import { TowersDefinition } from "./_types";

const towersVariants: TowersDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        pieces: {
          1: ["d1", "e1", "d5", "e2"],
          2: ["a5", "b5", "a1", "b4"]
        }
      },
      marks: ["d1"],
      potentialMarks: ["b1", "d4"]
    }
  }
];

export default towersVariants;
