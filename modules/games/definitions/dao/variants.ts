import { DaoDefinition } from "./_types";

const daoVariants: DaoDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      marks: ["a4"],
      potentialMarks: ["a2", "c4"],
      setup: {
        soldiers: {
          "1": ["a1", "b1", "b2", "d4"],
          "2": ["c1", "c2", "b3", "a4"],
        },
      },
    },
  },
];

export default daoVariants;
