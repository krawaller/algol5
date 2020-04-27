// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { ScatterDefinition } from "./_types";

const scatterGenerators: ScatterDefinition["generators"] = {
  findnorthtargets: {
    starts: "kings",
    type: "neighbour",
    dirs: [1, 2, "d1f2r0", "d1f2r1"],
    draw: {
      neighbours: {
        tolayer: "northtargets",
      },
    },
  },
  findeasttargets: {
    starts: "kings",
    type: "neighbour",
    dirs: ["d3f2r0", "d3f3r0", "d3f2r1", "d3f3r1"],
    draw: {
      neighbours: {
        tolayer: "easttargets",
      },
    },
  },
  findsouthtargets: {
    starts: "kings",
    type: "neighbour",
    dirs: ["d5f2r0", "d5f3r0", "d5f2r-1", "d5f3r-1"],
    draw: {
      neighbours: {
        tolayer: "southtargets",
      },
    },
  },
  findwesttargets: {
    starts: "kings",
    type: "neighbour",
    dirs: [6, 7, "d7f2r-1", "d7f2r0"],
    draw: {
      neighbours: {
        tolayer: "westtargets",
      },
    },
  },
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
