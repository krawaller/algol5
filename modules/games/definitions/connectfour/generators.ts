// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { ConnectfourDefinition } from "./_types";

const connectfourGenerators: ConnectfourDefinition["generators"] = {
  findwinline: {
    type: "walker",
    dirs: "rose",
    starts: "myunits",
    startasstep: true,
    steps: "myunits",
    draw: {
      steps: {
        condition: { morethan: [["walklength"], 3] },
        tolayer: "winline",
      },
    },
  },
  finddroptargets: {
    type: "walker",
    dir: 5,
    starts: { subtract: ["edge", "units"] },
    blocks: "units",
    startasstep: true,
    draw: {
      last: {
        tolayer: "droptargets",
      },
    },
  },
};

export default connectfourGenerators;
