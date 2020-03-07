// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { ChameleonDefinition } from "./_types";

const chameleonGenerators: ChameleonDefinition["generators"] = {
  findinvaders: {
    type: "filter",
    layer: { intersect: ["oppunits", "mybase"] },
    tolayer: "invaders"
  },
  findsteptargets: {
    start: "selectunit",
    type: "neighbour",
    dirs: "rose",
    draw: {
      neighbours: {
        condition: { noneat: ["myunits", ["target"]] },
        tolayer: {
          ifelse: [
            {
              or: [
                { and: [{ diag: ["dir"] }, { anyat: ["knights", ["start"]] }] },
                {
                  and: [{ ortho: ["dir"] }, { anyat: ["bishops", ["start"]] }]
                }
              ]
            },
            "morph",
            "movetarget"
          ]
        }
      }
    }
  },
  findbishoptargets: {
    start: "selectunit",
    type: "walker",
    dirs: "diag",
    blocks: "units",
    draw: {
      steps: { tolayer: "movetarget" },
      block: {
        condition: { noneat: ["myunits", ["target"]] },
        tolayer: "movetarget"
      }
    }
  },
  findknighttargets: {
    start: "selectunit",
    type: "neighbour",
    dirs: "knight",
    draw: {
      neighbours: {
        condition: { noneat: ["myunits", ["target"]] },
        tolayer: "movetarget"
      }
    }
  }
};

export default chameleonGenerators;
