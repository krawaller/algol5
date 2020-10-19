import { CanthesardinesDefinition } from "./_types";

const canthesardinesVariants: CanthesardinesDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        sardines: {
          1: [{ holerect: ["a1", "i1", "e1", "d1"] }, "d6"],
          2: [{ holerect: ["a9", "i9", "e9"] }],
        },
      },
      marks: ["d9"],
      potentialMarks: [
        "a6",
        "b7",
        "c8",
        "d7",
        "d8",
        "e9",
        "e8",
        "f7",
        "g6",
        "h5",
        "i4",
      ],
    },
  },
];

export default canthesardinesVariants;
