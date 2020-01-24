// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { AtriumGenerators } from "./_types";

const atriumGenerators: AtriumGenerators = {
  findmovetargets: {
    type: "neighbour",
    start: "selectunit",
    dirs: "ortho",
    unlessover: "units",
    draw: { neighbours: { tolayer: "movetargets" } }
  },
  findwinlines: {
    type: "walker",
    starts: "myunits",
    startasstep: true,
    dirs: "rose",
    steps: {
      ifelse: [{ anyat: ["mykings", ["start"]] }, "mykings", "myqueens"]
    },
    draw: {
      steps: { condition: { same: [["walklength"], 3] }, tolayer: "winline" }
    }
  }
};

export default atriumGenerators;
