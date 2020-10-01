// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { CanthesardinesDefinition } from "./_types";

const canthesardinesGenerators: CanthesardinesDefinition["generators"] = {
  findmovetargets: {
    type: "walker",
    start: "selectunit",
    dirs: "rose",
    blocks: "units",
    draw: {
      steps: {
        tolayer: "movetargets",
      },
    },
  },
};

export default canthesardinesGenerators;
