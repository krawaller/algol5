import { DaggersDefinition } from "./_types";

const daggersVariantBook: DaggersDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "a",
    arr: {
      marks: ["c6"],
      potentialMarks: ["a4", "c4", "e4", "b5", "c5", "d5", "b7", "c7"],
      setup: {
        crowns: {
          "1": ["b6", "d8"],
          "2": ["f1", "c2"],
        },
        daggers: {
          "1": ["c6", "e6", "d7", "f7"],
          "2": ["d2", "f2", "g2", "b3", "c3", "f3", "b4", "e4"],
        },
      },
    },
  },
];

export default daggersVariantBook;
