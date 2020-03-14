import { MurusgallicusDefinition } from "./_types";

const murusgallicusVariantBook: MurusgallicusDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "x",
    arr: {
      marks: ["c3"],
      potentialMarks: ["e3", "a5", "e5"],
      setup: {
        towers: {
          "1": ["e1", "g1", "h1", "b2", "c2", "b3", "c3"],
          "2": ["f5", "b6", "g6", "c7", "d7", "e7"],
        },
        walls: {
          "1": ["e2", "d3"],
          "2": ["b5", "c5", "g5", "f6"],
        },
      },
    },
  },
  {
    ruleset: "advanced",
    board: "basic",
    setup: "basic",
    desc: "advanced",
    code: "k",
    arr: {
      marks: ["c3"],
      potentialMarks: ["a3", "a5", "c5", "e5", "c6", "f6"],
      setup: {
        towers: {
          "1": ["g1", "d3", "c4"],
          "2": ["d5", "e5", "b6", "f6", "g6"],
        },
        walls: {
          "1": ["g2", "e3", "f3", "b4"],
          "2": ["d4", "b5", "c5"],
        },
        catapults: {
          "1": ["b3", "c3"],
          "2": ["f5"],
        },
      },
    },
  },
];

export default murusgallicusVariantBook;
