// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { KachitknightDefinition } from "./_types";

const kachitknightGenerators: KachitknightDefinition["generators"] = {
  findsteptargets: {
    start: "selectunit",
    dirs: "rose",
    type: "neighbour",
    draw: {
      neighbours: {
        unlessover: "myunits",
        tolayer: "movetargets",
      },
    },
  },
  findorthotargets: {
    start: "selectunit",
    dirs: "ortho",
    type: "walker",
    blocks: "units",
    draw: {
      steps: {
        tolayer: "movetargets",
      },
      block: {
        ifover: "oppunits",
        tolayer: "movetargets",
      },
    },
  },
  finddiagtargets: {
    start: "selectunit",
    dirs: "diag",
    type: "walker",
    blocks: "units",
    draw: {
      steps: {
        tolayer: "movetargets",
      },
      block: {
        ifover: "oppunits",
        tolayer: "movetargets",
      },
    },
  },
};

export default kachitknightGenerators;
