import { MonkeyqueenDefinition } from "./_types";

const monkeyqueenVariants: MonkeyqueenDefinition["variants"] = [
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

export default monkeyqueenVariants;
