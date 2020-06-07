// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { AtriumDefinition } from "./_types";

const atriumGenerators: AtriumDefinition["generators"] = {
  findmovetargets: {
    type: "neighbour",
    start: "selectunit",
    dirs: "ortho",
    draw: {
      neighbours: {
        tolayer: "movetargets",
        include: {
          dir: ["dir"],
        },
      },
    },
  },
  findpushees: {
    type: "walker",
    dir: { read: ["movetargets", "selectmovetarget", "dir"] },
    start: "selectmovetarget",
    startasstep: true,
    steps: "units",
    draw: {
      steps: {
        condition: { stoppedBecause: "nomoresteps" },
        tolayer: "pushees",
      },
      last: {
        tolayer: "lastpushee",
        condition: { stoppedBecause: "nomoresteps" },
      },
    },
  },
  findwinlines: {
    type: "walker",
    starts: "myunits",
    startasstep: true,
    dirs: "rose",
    steps: {
      ifelse: [{ anyat: ["mykings", ["start"]] }, "mykings", "myqueens"],
    },
    draw: {
      steps: { condition: { same: [["walklength"], 3] }, tolayer: "winline" },
    },
  },
};

export default atriumGenerators;
