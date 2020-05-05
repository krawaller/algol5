import { SpeedsoccolotDefinition } from "./_types";

const speedsoccolotVariants: SpeedsoccolotDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "speed",
    code: "r",
    arr: {
      setup: {
        ball: {
          0: ["e3"],
        },
        players: {
          1: ["b2", "c2", "d1", "f2", "f3"],
          2: ["c3", "c6", "d6", "e6", "f5"],
        },
      },
      marks: [],
      potentialMarks: [],
    },
  },
  {
    ruleset: "basic",
    board: "original",
    setup: "original",
    desc: "original",
    code: "o",
    arr: {
      setup: {},
      marks: [],
      potentialMarks: [],
    },
  },
];

export default speedsoccolotVariants;
