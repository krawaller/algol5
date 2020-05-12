import { CrossingsDefinition } from "./_types";

const crossingsVariants: CrossingsDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        soldiers: {
          1: [
            "a1",
            "a2",
            "b2",
            "c1",
            "d3",
            "d4",
            "e1",
            "e2",
            "e3",
            "e4",
            "f1",
            "f2",
            "g2",
            "h1",
            "h2",
          ],
          2: [
            "a7",
            "a8",
            "b7",
            "b8",
            "c7",
            "d8",
            "e6",
            "e7",
            "e8",
            "f5",
            "f6",
            "g7",
            "g8",
            "h7",
            "h8",
          ],
        },
      },
      marks: [],
      potentialMarks: [],
    },
  },
];

export default crossingsVariants;
