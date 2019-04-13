import { SerauqsGenerators } from "./_types";

const serauqsGenerators: SerauqsGenerators = {
  findmovetargets: {
    type: "neighbour",
    start: "selectunit",
    dirs: "rose",
    unlessover: "units",
    draw: { neighbours: { tolayer: "movetargets" } }
  },
  findwinline: {
    type: "walker",
    starts: { union: ["myunits", "oppwild"] },
    dirs: "rose",
    steps: { union: ["myunits", "oppwild"] },
    count: "mybase",
    startasstep: true,
    draw: {
      steps: {
        condition: {
          and: [
            { same: [["walklength"], 4] },
            { different: [["totalcount"], 4] }
          ]
        },
        tolayer: "winline"
      }
    }
  }
};

export default serauqsGenerators;
