// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { NeutreekoDefinition } from "./_types";

const neutreekoGenerators: NeutreekoDefinition["generators"] = {
  findmovetargets: {
    type: "walker",
    start: "selectunit",
    dirs: "rose",
    blocks: "units",
    draw: { last: { tolayer: "movetargets" } },
  },
  findwinline: {
    type: "walker",
    starts: "myunits",
    dirs: "rose",
    startasstep: true,
    steps: "myunits",
    draw: {
      steps: {
        condition: { morethan: [["walklength"], 2] },
        tolayer: "winline",
      },
    },
  },
};

export default neutreekoGenerators;
