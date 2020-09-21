import { NeutreekoDefinition } from "./_types";

const neutreekoVariants: NeutreekoDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        pieces: {
          1: ["b1", "c4", "d1"],
          2: ["b5", "c2", "d5"]
        }
      },
      marks: [],
      potentialMarks: []
    }
  }
];

export default neutreekoVariants;
