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
          1: ["b1", "e4", "d1"],
          2: ["b5", "c2", "d5"]
        }
      },
      marks: ["b5"],
      potentialMarks: ["a5", "c5", "a4", "b2", "e2"]
    }
  },
  {
    ruleset: "basic",
    board: "small",
    setup: "small",
    desc: "small",
    code: "S",
    arr: {
      setup: {},
      marks: [],
      potentialMarks: []
    }
  },
  {
    ruleset: "basic",
    board: "mini",
    setup: "mini",
    desc: "mini",
    code: "M",
    arr: {
      setup: {},
      marks: [],
      potentialMarks: []
    }
  }
];

export default neutreekoVariants;
