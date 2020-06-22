// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { StoogesDefinition } from "./_types";

const stoogesGenerators: StoogesDefinition["generators"] = {
  findmovetargets: {
    type: "neighbour",
    dirs: "rose",
    start: "selectdouble",
    ifover: "mysingles",
    draw: {
      neighbours: {
        tolayer: "movetargets",
      },
    },
  },
  findwinline: {
    type: "walker",
    starts: "mydoubles",
    dirs: "rose",
    startasstep: true,
    steps: "mydoubles",
    draw: {
      steps: {
        condition: { morethan: [["walklength"], 2] },
        tolayer: "winline",
      },
    },
  },
};

export default stoogesGenerators;
