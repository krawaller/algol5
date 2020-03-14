import { TrafficlightsDefinition } from "./_types";

const trafficlightsVariantBook: TrafficlightsDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "b",
    arr: {
      setup: {
        bishops: {
          "0": ["b1", "b2"],
        },
        pawns: {
          "0": ["a2", "c3"],
        },
        kings: {
          "0": ["c2"],
        },
      },
    },
  },
];

export default trafficlightsVariantBook;
