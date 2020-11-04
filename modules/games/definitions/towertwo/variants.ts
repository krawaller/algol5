import { TowertwoDefinition } from "./_types";

const towertwoVariants: TowertwoDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        soldiers: {
          1: ["b2", "b3", "b5", "e5"],
          2: ["c2", "e3"],
        },
      },
      marks: ["c2"],
      potentialMarks: [
        "a1",
        "b1",
        "b4",
        "c1",
        "c3",
        "c4",
        "c5",
        "d1",
        "d2",
        "d3",
        "d4",
        "e1",
        "e2",
        "f2",
      ],
    },
  },
];

export default towertwoVariants;
