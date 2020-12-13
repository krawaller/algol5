import { GrensholmDefinition } from "./_types";

const grensholmVariants: GrensholmDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        soldiers: {
          "1": ["a2", "a3", "b3"],
          "2": ["f1", "f3", "f4"],
        },
        kings: {
          "1": ["c3"],
          "2": ["d1"]
        },
      },
      marks: ["d1"],
      potentialMarks: ["f2"]
    }
  }
];

export default grensholmVariants;
