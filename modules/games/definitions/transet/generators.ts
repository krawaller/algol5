// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { TransetDefinition } from "./_types";

const transetGenerators: TransetDefinition["generators"] = {
  findswap2step: {
    type: "neighbour",
    start: "selectswapunit",
    dir: { reldir: [5, { read: ["swap1steps", "selectswap1target", "dir"] }] },
    unlessover: { union: ["units", { single: "selectswap1target" }] },
    draw: { neighbours: { tolayer: "swap2step" } }
  },
  findswap1steps: {
    type: "neighbour",
    start: "selectunit",
    dirs: "ortho",
    unlessover: "units",
    draw: { neighbours: { tolayer: "swap1steps", include: { dir: ["dir"] } } }
  },
  findmovetargets: {
    type: "neighbour",
    start: "selectunit",
    dirs: {
      playercase: [
        {
          ifelse: [
            { anyat: ["pinets", "selectunit"] },
            [1],
            {
              ifelse: [{ anyat: ["piokers", "selectunit"] }, [8, 2], [8, 1, 2]]
            }
          ]
        },
        {
          ifelse: [
            { anyat: ["pinets", "selectunit"] },
            [5],
            {
              ifelse: [{ anyat: ["piokers", "selectunit"] }, [4, 6], [4, 5, 6]]
            }
          ]
        }
      ]
    },
    unlessover: "myunits",
    draw: { neighbours: { tolayer: "movetargets" } }
  }
};

export default transetGenerators;
