import { SaposDefinition } from "./_types";

const saposVariants: SaposDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        toads: {
          1: ["d2", "e3", "e4", "h5"],
          2: ["d7", "e6", "e7", "f6"],
        },
      },
      marks: ["e3"],
      potentialMarks: ["c1", "e5"],
    },
  },
];

export default saposVariants;
