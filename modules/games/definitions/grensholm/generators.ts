// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { GrensholmDefinition } from "./_types";

const knightLeftToRightDirs = [
  "d1f2r1",
  "d3f2r1",
  "d3f2r-1",
  "d5f2r-1"
];

const knightRightToLeftDirs = [
  "d1f2r-1",
  "d5f2r1",
  "d7f2r1",
  "d7f2r-1"
];

const grensholmGenerators: GrensholmDefinition["generators"] = {
  findmovetargets: {
    type: "neighbour",
    start: "selectunit",
    dirs: {
      ifelse: [
        { anyat: ["mykings", "selectunit"] },
        {
          playercase: [
            knightRightToLeftDirs,
            knightLeftToRightDirs
          ]
        },
        {
          playercase: [
            knightLeftToRightDirs,
            knightRightToLeftDirs
          ]
        }
      ]
    },
    condition: {
      ifelse: [
        { or: [{ same: [["dir"], 1] }, { same: [["dir"], 5] }] },
        { noneat: ["units", ["target"]] },
        { noneat: ["myunits", ["target"]] }
      ]
    },
    draw: { neighbours: { tolayer: "movetargets" } }
  }
};

export default grensholmGenerators;
