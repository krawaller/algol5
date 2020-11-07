// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { PartisansDefinition } from "./_types";

const partisansGenerators: PartisansDefinition["generators"] = {
  findmovetargets: {
    type: "walker",
    dirs: "rose",
    start: "selectunit",
    blocks: "oppunits",
    draw: {
      steps: {
        unlessover: "units",
        tolayer: "movetargets",
      },
    },
  },
  findfiretargets: {
    type: "walker",
    dirs: "rose",
    start: { turnpos: "movedto" },
    blocks: "oppunits",
    draw: {
      steps: {
        unlessover: "units",
        tolayer: "firetargets",
      },
    },
  },
};

export default partisansGenerators;
