// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { TyrannosDefinition } from "./_types";

const tyrannosGenerators: TyrannosDefinition["generators"] = {
  findtargets: {
    type: "walker",
    start: "selectunit",
    dirs: {
      ifelse: [
        { anyat: ["warriors", "selectunit"] },
        {
          playercase: [
            { ifelse: [{ anyat: ["dark", "selectunit"] }, [8, 1, 2], [1]] },
            { ifelse: [{ anyat: ["dark", "selectunit"] }, [4, 5, 6], [5]] },
          ],
        },
        { ifelse: [{ anyat: ["dark", "selectunit"] }, "rose", "ortho"] },
      ],
    },
    max: { ifelse: [{ anyat: ["heroes", "selectunit"] }, 10, 1] },
    blocks: "units",
    stopPrio: ["outofbounds", "reachedmax", "hitblock"],
    draw: {
      steps: {
        condition: {
          or: [
            { noneat: ["heroes", "selectunit"] },
            { noneat: ["temple", ["target"]] },
          ],
        },
        tolayer: "movetargets",
      },
      block: {
        ifover: "oppunits",
        unlessover: "barricades",
        condition: {
          or: [
            { anyat: ["heroes", "selectunit"] },
            { same: [["walklength"], 0] },
          ],
        },
        tolayer: "attacktargets",
      },
    },
  },
};

export default tyrannosGenerators;
