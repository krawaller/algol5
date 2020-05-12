// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { DuckpondDefinition } from "./_types";

const duckpondGenerators: DuckpondDefinition["generators"] = {
  findmovetargets: {
    type: "walker",
    start: "selectunit",
    dirs: "rose",
    max: 2,
    draw: {
      steps: {
        unlessover: "units",
        tolayer: "movetargets",
      },
    },
  },
  findwinlines: {
    type: "walker",
    starts: "myunits",
    dirs: "rose",
    startasstep: true,
    steps: "myunits",
    draw: {
      steps: {
        condition: { same: [["walklength"], 4] },
        tolayer: "winline",
      },
    },
  },
};

export default duckpondGenerators;
