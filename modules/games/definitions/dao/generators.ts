// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { DaoDefinition } from "./_types";

const daoGenerators: DaoDefinition["generators"] = {
  findmovetargets: {
    type: "walker",
    dirs: "rose",
    start: "selectunit",
    blocks: "units",
    draw: {
      last: {
        tolayer: "movetargets",
      },
    },
  },
  findwinline: {
    type: "walker",
    dirs: "ortho",
    starts: "myunits",
    steps: "myunits",
    startasstep: true,
    draw: {
      steps: {
        condition: { same: [["walklength"], 4] },
        tolayer: "winline",
      },
    },
  },
};

export default daoGenerators;
