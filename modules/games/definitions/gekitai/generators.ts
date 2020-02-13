// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { GekitaiGenerators } from "./_types";

const gekitaiGenerators: GekitaiGenerators = {
  findpushconsequences: {
    type: "walker",
    start: "selectdroptarget",
    dirs: "rose",
    steps: "units",
    max: 1,
    stopPrio: ["outofbounds", "nomoresteps", "reachedmax"],
    draw: {
      last: [
        {
          condition: { stoppedBecause: "outofbounds" },
          tolayer: "death",
        },
        {
          condition: { stoppedBecause: "nomoresteps" },
          tolayer: "push",
          include: { pushdir: ["dir"] },
        },
      ],
    },
  },
};

export default gekitaiGenerators;
