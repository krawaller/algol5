// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { TobitoDefinition } from "./_types";

const tobitoGenerators: TobitoDefinition["generators"] = {
  findmovetargets: {
    type: "walker",
    dirs: "rose",
    start: "selectunit",
    blocks: { union: ["oppfinishers", { subtract: ["board", "units"] }] },
    draw: {
      block: {
        unlessover: "units",
        tolayer: "movetargets",
        include: {
          dir: ["dir"],
        },
      },
    },
  },
  findrelocatees: {
    type: "walker",
    start: "selectmovetarget",
    dir: { reldir: [{ read: ["movetargets", "selectmovetarget", "dir"] }, 5] },
    steps: "units",
    draw: {
      steps: {
        ifover: "runners",
        unlessover: "myrunners",
        tolayer: "relocatees",
      },
    },
  },
};

export default tobitoGenerators;
