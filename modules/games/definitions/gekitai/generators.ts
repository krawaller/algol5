// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { GekitaiDefinition } from "./_types";

const gekitaiGenerators: GekitaiDefinition["generators"] = {
  findendline: {
    type: "walker",
    starts: "units",
    dirs: "rose",
    steps: {
      ifelse: [{ anyat: ["myunits", ["start"]] }, "myunits", "oppunits"]
    },
    startasstep: true,
    draw: {
      steps: {
        condition: { morethan: [["walklength"], 2] },
        tolayer: {
          ifelse: [{ anyat: ["myunits", ["start"]] }, "winline", "loseline"]
        }
      }
    }
  },
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
          include: { pushdir: ["dir"] }
        },
        {
          condition: { stoppedBecause: "nomoresteps" },
          tolayer: "push",
          include: { pushdir: ["dir"] }
        }
      ]
    }
  }
};

export default gekitaiGenerators;
