import { ZoneshDefinition } from "./_types";

const zoneshVariants: ZoneshDefinition["variants"] = [
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

export default zoneshVariants;
