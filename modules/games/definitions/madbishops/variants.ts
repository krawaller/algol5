import { MadbishopsDefinition } from "./_types";

const madbishopsVariants: MadbishopsDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        bishops: {
          1: [
            "a1",
            "a5",
            "b6",
            "b8",
            "c3",
            "c7",
            "c9",
            "d10",
            "e1",
            "e7",
            "f8",
            "g3",
            "g9",
            "h10",
            "i1",
            "i3",
            "i5",
            "i7",
            "j4",
            "j8",
          ],
          2: [
            "a3",
            "a7",
            "b10",
            "c5",
            "d6",
            "d8",
            "e9",
            "f4",
            "f10",
            "g1",
            "g5",
            "h4",
            "h8",
            "i9",
            "j2",
            "j6",
            "j10",
          ],
        },
      },
      marks: ["h8"],
      potentialMarks: ["c3", "g9", "i7"],
    },
  },
];

export default madbishopsVariants;
