// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { DescentGenerators } from "./_types";

const descentGenerators: DescentGenerators = {
  findmovetargets: {
    type: "neighbour",
    dirs: "rose",
    start: "selectunit",
    condition: {
      ifelse: [
        { anyat: ["rooks", "selectunit"] },
        { noneat: ["pawns", ["target"]] },
        {
          ifelse: [
            { anyat: ["pawns", "selectunit"] },
            { noneat: ["rooks", ["target"]] },
            ["true"]
          ]
        }
      ]
    },
    draw: { neighbours: { ifover: "neutralunits", tolayer: "movetargets" } }
  },
  finddigtargets: {
    type: "neighbour",
    dirs: "rose",
    start: { turnpos: "movedto" },
    ifover: "neutralunits",
    draw: { neighbours: { tolayer: "digtargets" } }
  },
  findwinlines: {
    type: "walker",
    dirs: "rose",
    starts: "myunits",
    startasstep: true,
    steps: {
      ifelse: [
        { anyat: ["myrooks", ["start"]] },
        "myrooks",
        {
          ifelse: [{ anyat: ["myknights", ["start"]] }, "myknights", "mypawns"]
        }
      ]
    },
    draw: {
      steps: {
        condition: { morethan: [["walklength"], 2] },
        tolayer: "winline"
      }
    }
  }
};

export default descentGenerators;
