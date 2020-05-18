import { KachitknightDefinition } from "./_types";

const kachitknightVariants: KachitknightDefinition["variants"] = [
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

export default kachitknightVariants;
