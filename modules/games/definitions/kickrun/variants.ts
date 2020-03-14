import { KickrunDefinition } from "./_types";

const kickrunVariantBook: KickrunDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "m",
    arr: {
      setup: {
        sidekickers: {
          "1": ["b1", "d1", "b3"],
          "2": ["c3", "c4", "e4"],
        },
        runners: {
          "1": ["c2", "a5"],
          "2": ["e3", "d5"],
        },
      },
    },
  },
];

export default kickrunVariantBook;
