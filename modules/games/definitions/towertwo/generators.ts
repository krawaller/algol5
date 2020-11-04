// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { TowertwoDefinition } from "./_types";

const towertwoGenerators: TowertwoDefinition["generators"] = {
  findmovetargets: {
    type: "floater",
    start: "selectsource",
    dirs: "ortho",
    blocks: "units",
    max: { minus: [3, { firsttruthy: [{ turnvar: "spent" }, 0] }] },
    draw: {
      steps: {
        tolayer: "movetargets",
        include: {
          dist: ["floatlength"],
        },
      },
    },
  },
  findvictims: {
    type: "walker",
    start: { firsttruthy: ["selectmovetarget", "selectsource"] },
    max: 1,
    dirs: "ortho",
    stopPrio: ["outofbounds", "hitblock", "reachedmax", "nomoresteps"],
    blocks: "myunits",
    steps: "oppunits",
    draw: {
      steps: {
        condition: { stoppedBecause: "hitblock" },
        tolayer: "victims",
      },
    },
  },
};

export default towertwoGenerators;
