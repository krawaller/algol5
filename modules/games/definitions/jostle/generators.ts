// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { JostleDefinition } from "./_types";

const jostleGenerators: JostleDefinition["generators"] = {
  findinitial: {
    type: "neighbour",
    dirs: "ortho",
    start: "selectunit",
    draw: {
      neighbours: {
        tolayer: {
          ifelse: [
            { noneat: ["units", ["target"]] },
            "movetargets",
            {
              ifelse: [
                { anyat: ["oppunits", ["target"]] },
                "initialenemy",
                "initialfriend"
              ]
            }
          ]
        }
      }
    }
  },
  findnew: {
    type: "neighbour",
    dirs: "ortho",
    start: "selectmovetarget",
    ifover: "units",
    draw: {
      neighbours: {
        tolayer: {
          ifelse: [{ anyat: ["oppunits", ["target"]] }, "newenemy", "newfriend"]
        }
      }
    }
  }
};

export default jostleGenerators;
