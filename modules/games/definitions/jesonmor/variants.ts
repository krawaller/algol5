import { JesonmorDefinition } from "./_types";

const jesonmorVariants: JesonmorDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        horses: {"1": [{rect: ["a1", "i1"]}], "2": [{rect: ["a9", "i9"]}]}
      },
      marks: [],
      potentialMarks: []
    }
  }
];

export default jesonmorVariants;
