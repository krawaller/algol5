import { ConnectfourDefinition } from "./_types";

const connectfourVariants: ConnectfourDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        markers: {
          1: ["c1", "d1", "d2", "d3", "e3"],
          2: ["b1", "c2", "e1", "e2"],
        },
      },
      marks: [],
      potentialMarks: ["a1", "b2", "c3", "d4", "e4", "f1", "g1"],
    },
  },
];

export default connectfourVariants;
