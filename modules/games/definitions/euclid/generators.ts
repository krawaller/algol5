// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { EuclidDefinition } from "./_types";

const euclidGenerators: EuclidDefinition["generators"] = {
  findmovetargets: {
    type: "walker",
    dirs: { ifelse: [{ anyat: ["mykings", "selectunit"] }, "rose", "ortho"] },
    start: "selectunit",
    blocks: "units",
    draw: {
      steps: {
        tolayer: "movetargets",
      },
    },
  },
  findintersections: {
    type: "walker",
    dirs: "ortho",
    starts: { union: ["mykings", { single: "selectmovetarget" }] },
    draw: {
      steps: [
        {
          ifover: "lines",
          tolayer: "intersection",
        },
        {
          ifover: "oppsoldiers",
          tolayer: "lines",
        },
      ],
    },
  },
};

export default euclidGenerators;
