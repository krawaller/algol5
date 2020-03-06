// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { AmazonsDefinition } from "./_types";

const amazonsGenerators: AmazonsDefinition["generators"] = {
  findmovetargets: {
    type: "walker",
    dirs: "rose",
    start: "selectunit",
    blocks: "units",
    draw: { steps: { tolayer: "movetargets" } }
  },
  findfiretargets: {
    type: "walker",
    dirs: "rose",
    start: "selectmovetarget",
    blocks: "units",
    draw: {
      start: { tolayer: "firedfrom" },
      steps: { tolayer: "firetargets" }
    }
  }
};

export default amazonsGenerators;
