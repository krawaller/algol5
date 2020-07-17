import { TyrannosDefinition } from "./_types";

const tyrannosVariants: TyrannosDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        barricades: {
          1: ["e3"],
          2: ["e7"],
        },
        tyrannos: {
          1: ["e2"],
          2: ["e8"],
        },
        warriors: {
          1: [{ holerect: ["a3", "i3", "e3"] }],
          2: [{ holerect: ["a7", "i7", "e7"] }],
        },
        heroes: {
          1: ["a2", "b2", "c2", "g2", "h2", "i2"],
          2: ["a8", "b8", "c8", "g8", "h8", "i8"],
        },
      },
      marks: ["c3"],
      potentialMarks: ["b4", "c4", "d4"],
    },
  },
];

export default tyrannosVariants;
