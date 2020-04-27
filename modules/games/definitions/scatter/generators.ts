// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { ScatterDefinition } from "./_types";

const scatterGenerators: ScatterDefinition["generators"] = {
  findmovetargets: {
    start: "selectunit",
    type: "neighbour",
    dirs: "ortho",
    unlessover: "units",
    draw: {
      neighbours: {
        tolayer: "movetargets",
      },
    },
  },
};

export default scatterGenerators;
