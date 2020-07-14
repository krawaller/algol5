import { EuclidDefinition } from "./_types";

const euclidVariants: EuclidDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {},
      marks: [],
      potentialMarks: []
    }
  }
];

export default euclidVariants;
