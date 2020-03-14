import { TrafficlightsDefinition } from "./_types";

const trafficlightsVariantBook: TrafficlightsDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "b",
    arr: {
      marks: [],
      potentialMarks: [
        "a1",
        "b1",
        "c1",
        "d1",
        "a2",
        "b2",
        "d2",
        "a3",
        "b3",
        "c3",
        "d3",
      ],
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
