// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { OutwitDefinition } from "./_types";

const outwitGenerators: OutwitDefinition["generators"] = {
  findkingtargets: {
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
  findsoldiertargets: {
    type: "walker",
    start: "selectunit",
    dirs: "ortho",
    blocks: "units",
    draw: { last: { tolayer: "movetargets" } },
  },
};

export default outwitGenerators;
