import { PaperneutronDefinition } from "./_types";

const paperneutronVariants: PaperneutronDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        soldiers: {
          0: ["a2", "d2"],
          1: ["a1", "b1", "c3", "d3"],
          2: ["a4", "b2", "c4", "d4"],
        },
      },
      marks: [],
      potentialMarks: [],
    },
  },
];

export default paperneutronVariants;
