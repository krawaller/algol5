import { GekitaiDefinition } from "./_types";

const gekitaiVariantBook: GekitaiDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "u",
    arr: {
      setup: {
        markers: {
          "1": ["a1", "b2", "d2", "d4"],
          "2": ["a2", "f4", "f5", "b6"],
        },
      },
    },
  },
];

export default gekitaiVariantBook;
