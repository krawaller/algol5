// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { IagoDefinition } from "./_types";

const iagoGenerators: IagoDefinition["generators"] = {
  findmovetargets: {
    type: "walker",
    dirs: "rose",
    start: "selectunit",
    blocks: "oppunits",
    draw: {
      steps: {
        unlessover: "units",
        tolayer: "movetargets",
      },
    },
  },
  findspawntargets: {
    type: "walker",
    dirs: "rose",
    start: { turnpos: "movedto" },
    blocks: "oppunits",
    draw: {
      steps: {
        unlessover: "units",
        tolayer: "firetargets",
      },
    },
  },
  findothellovictims: {
    type: "walker",
    start: "selectfiretarget",
    dirs: "rose",
    steps: "oppstones",
    blocks: "myunits",
    stopPrio: ["outofbounds", "hitblock", "nomoresteps"],
    draw: {
      steps: {
        condition: { stoppedBecause: "hitblock" },
        tolayer: "victims",
      },
    },
  },
};

export default iagoGenerators;
