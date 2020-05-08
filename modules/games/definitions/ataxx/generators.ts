// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { AtaxxDefinition } from "./_types";

const ataxxGenerators: AtaxxDefinition["generators"] = {
  findsplittargets: {
    type: "neighbour",
    start: "selectunit",
    dirs: "rose",
    unlessover: "units",
    draw: {
      neighbours: [{ tolayer: "splittargets" }, { tolayer: "movetargets" }],
    },
  },
  findjumptargets: {
    type: "neighbour",
    start: "selectunit",
    dirs: "ring2",
    unlessover: "units",
    draw: {
      neighbours: [{ tolayer: "jumptargets" }, { tolayer: "movetargets" }],
    },
  },
  findassimilated: {
    type: "neighbour",
    start: { firsttruthy: ["selectjumptarget", "selectsplittarget"] },
    dirs: "rose",
    ifover: "oppunits",
    draw: {
      neighbours: { tolayer: "assimilated" },
    },
  },
};

export default ataxxGenerators;
