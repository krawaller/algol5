// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { MadbishopsDefinition } from "./_types";

const madbishopsGenerators: MadbishopsDefinition["generators"] = {
  findmovetargets: {
    type: "walker",
    start: "selectunit",
    dirs: "diag",
    blocks: "units",
    draw: {
      steps: { tolayer: "movetargets" },
      block: {
        ifover: "oppunits",
        tolayer: "killtargets",
      },
    },
  },
  findthreats: {
    type: "walker",
    start: "selectmovetarget",
    dirs: "diag",
    blocks: "units",
    draw: {
      block: {
        ifover: "oppunits",
        tolayer: "threatened",
      },
    },
  },
};

export default madbishopsGenerators;
