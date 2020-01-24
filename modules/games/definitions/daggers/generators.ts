// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { DaggersGenerators } from "./_types";

const daggersGenerators: DaggersGenerators = {
  findcrowntargets: {
    type: "neighbour",
    dirs: "rose",
    start: "selectunit",
    draw: {
      neighbours: {
        condition: { noneat: ["myunits", ["target"]] },
        tolayer: "movetarget"
      }
    }
  },
  finddaggertargets: {
    type: "walker",
    start: "selectunit",
    dirs: [8, 1, 2, 4, 5, 6],
    blocks: "units",
    max: { ifelse: [{ valinlist: [["dir"], 8, 1, 2] }, 1, 8] },
    draw: {
      steps: { tolayer: "movetarget" },
      block: {
        condition: {
          and: [
            { noneat: ["myunits", ["target"]] },
            {
              not: {
                and: [
                  { valinlist: [["dir"], 1, 5] },
                  { anyat: ["oppdaggers", ["target"]] }
                ]
              }
            }
          ]
        },
        tolayer: "movetarget"
      }
    }
  }
};

export default daggersGenerators;
