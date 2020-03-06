// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { SerauqsDefinition } from "./_types";

const serauqsGenerators: SerauqsDefinition["generators"] = {
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
