import { ThreemusketeersDefinition } from "./_types";

const threemusketeersVariantBook: ThreemusketeersDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "t",
    arr: {
      marks: ["c3"],
      potentialMarks: ["c2", "d3", "c4"],
      setup: {
        pawns: {
          "2": [
            "a1",
            "b1",
            "c1",
            "d1",
            "e1",
            "c2",
            "d2",
            "e2",
            "a3",
            "d3",
            "e3",
            "a4",
            "b4",
            "c4",
            "a5",
            "c5",
            "d5",
          ],
        },
        kings: {
          "1": ["b2", "c3", "e4"],
        },
      },
    },
  },
];

export default threemusketeersVariantBook;
