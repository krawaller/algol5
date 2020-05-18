import { KachitknightDefinition } from "./_types";

const kachitknightVariants: KachitknightDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        leader: { 2: ["a4"] },
        leaderortho: { 1: ["c3"] },
        knightortho: { 1: ["d3"], 2: ["a2", "b4"] },
        knightdiag: { 1: ["c2"], 2: ["b3"] },
      },
      marks: [],
      potentialMarks: [],
    },
  },
];

export default kachitknightVariants;
