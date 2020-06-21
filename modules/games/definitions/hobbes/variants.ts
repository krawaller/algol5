import { HobbesDefinition } from "./_types";

const hobbesVariants: HobbesDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        kings: {
          1: ["d2"],
          2: ["b4"],
        },
        stones: {
          0: ["a4", "b1", "b2", "b5", "c2", "c3", "d3", "d4", "d5", "e1"],
        },
      },
      marks: [],
      potentialMarks: ["c1", "c2", "d1", "d3", "e2", "e4", "e5"],
    },
  },
];

export default hobbesVariants;
