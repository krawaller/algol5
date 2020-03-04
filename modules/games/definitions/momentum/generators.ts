// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { MomentumGenerators } from "./_types";

const momentumGenerators: MomentumGenerators = {
  findpusheffects: {
    type: "walker",
    start: "selectdroptarget",
    dirs: "rose",
    steps: "units",
    draw: {
      last: [
        {
          condition: { stoppedBecause: "outofbounds" },
          tolayer: "doomed",
          include: { pushdir: ["dir"] }
        },
        {
          condition: { stoppedBecause: "nomoresteps" },
          tolayer: "pushed",
          include: { pushdir: ["dir"] }
        }
      ]
    }
  }
};

export default momentumGenerators;
