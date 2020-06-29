import { ErdoslatinoDefinition } from "./_types";

const erdoslatinoVariants: ErdoslatinoDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        lvl1: {
          1: ["c3"],
          2: ["b5"],
        },
        lvl2: {
          0: ["d4"],
        },
        lvl3: {
          0: ["d5"],
          2: ["b1"],
        },
        lvl4: {
          1: ["c4"],
          2: ["b3"],
        },
        lvl5: {
          1: ["c5"],
          2: ["b2"],
        },
      },
      marks: [],
      potentialMarks: [
        "a1",
        "a2",
        "a3",
        "a4",
        "a5",
        "b4",
        "c1",
        "c2",
        "d1",
        "d2",
        "d3",
        "e1",
        "e2",
        "e3",
        "e4",
        "e5",
      ],
    },
  },
];

export default erdoslatinoVariants;
