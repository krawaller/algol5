import { NeutronDefinition } from "./_types";

const neutronVariants: NeutronDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        soldiers: {
          0: ["a3"],
          1: ["a4", "b4", "b3", "c1", "e1"],
          2: ["a1", "a5", "c5", "d5", "e2"],
        },
      },
      marks: [],
      potentialMarks: [],
    },
  },
  {
    ruleset: "paperneutron",
    board: "paperneutron",
    setup: "paperneutron",
    desc: "paper neutron",
    code: "p",
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

export default neutronVariants;
