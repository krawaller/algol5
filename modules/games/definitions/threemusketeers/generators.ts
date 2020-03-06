// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { ThreemusketeersDefinition } from "./_types";

const threemusketeersGenerators: ThreemusketeersDefinition["generators"] = {
  findstrandedmusketeers: {
    type: "neighbour",
    dirs: "ortho",
    starts: "kings",
    ifover: "pawns",
    draw: {
      start: {
        condition: { falsy: ["neighbourcount"] },
        tolayer: "strandedmusketeers"
      }
    }
  },
  findmusketeerline: {
    type: "walker",
    dirs: "ortho",
    starts: "kings",
    count: "kings",
    draw: {
      start: {
        condition: { same: [2, ["totalcount"]] },
        tolayer: "musketeerline"
      }
    }
  },
  findmovetargets: {
    type: "neighbour",
    dirs: "ortho",
    start: "selectunit",
    condition: {
      playercase: [
        { anyat: ["oppunits", ["target"]] },
        { noneat: ["units", ["target"]] }
      ]
    },
    draw: { neighbours: { tolayer: "movetargets" } }
  }
};

export default threemusketeersGenerators;
