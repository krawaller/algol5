import { DaoDefinition } from "./_types";

const daoVariants: DaoDefinition["variants"] = [
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

export default daoVariants;
