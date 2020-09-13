// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { HippolytaDefinition } from "./_types";

const hippolytaGenerators: HippolytaDefinition["generators"] = {
  findtargets: {
    type: "walker",
    start: "selectunit",
    blocks: "units",
    dirs: "rose",
    draw: {
      block: {
        ifover: "oppunits",
        tolayer: "targets",
      },
    },
  },
};

export default hippolytaGenerators;
