// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { YonmoqueDefinition } from "./_types";

const yonmoqueGenerators: YonmoqueDefinition["generators"] = {
  findsteptargets: {
    type: "neighbour",
    starts: "myunits",
    dirs: "rose",
    unlessover: "units",
    draw: {
      neighbours: {
        tolayer: "movetargets",
      },
    },
  },
  findslidetargets: {
    type: "walker",
    starts: "mybishops",
    dirs: "diag",
    blocks: "units",
    draw: {
      steps: {
        tolayer: "movetargets",
      },
    },
  },
};

export default yonmoqueGenerators;
