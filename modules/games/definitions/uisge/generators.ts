// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { UisgeDefinition } from "./_types";

const uisgeGenerators: UisgeDefinition["generators"] = {
  findmjumptargets: {
    type: "walker",
    start: "selectunit",
    dirs: "ortho",
    steps: "units",
    blocks: { subtract: ["board", "units"] },
    stopPrio: ["outofbounds", "hitblock", "nomoresteps"],
    draw: {
      block: {
        condition: { same: [["walklength"], 1] },
        tolayer: "jumptargets",
      },
    },
  },
  findsteptargets: {
    type: "neighbour",
    dirs: "rose",
    unlessover: "units",
    start: "selectunit",
    draw: {
      neighbours: {
        tolayer: "steptargets",
      },
    },
  },
  findgroup: {
    type: "floater",
    dirs: "ortho",
    start: { onlyin: "units" },
    steps: "units",
    draw: {
      steps: {
        tolayer: "group",
      },
    },
  },
};

export default uisgeGenerators;
