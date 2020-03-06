// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { MurusgallicusDefinition } from "./_types";

const murusgallicusGenerators: MurusgallicusDefinition["generators"] = {
  findmovetargets: {
    type: "walker",
    dirs: "rose",
    blocks: { union: ["oppunits", "mytowers"] },
    start: "selecttower",
    max: 2,
    draw: {
      steps: {
        condition: {
          and: [{ same: [["walklength"], 2] }, { same: [["step"], 2] }]
        },
        tolayer: "movetargets",
        include: { dir: ["dir"] }
      }
    }
  },
  findmoveresults: {
    type: "neighbour",
    dir: { reldir: [5, { read: ["movetargets", "selectmove", "dir"] }] },
    start: "selectmove",
    draw: {
      start: {
        tolayer: {
          ifelse: [
            { anyat: ["myunits", "selectmove"] },
            "madetowers",
            "madewalls"
          ]
        }
      },
      neighbours: {
        tolayer: {
          ifelse: [
            { anyat: ["myunits", ["target"]] },
            "madetowers",
            "madewalls"
          ]
        }
      }
    }
  },
  findcrushtargets: {
    type: "neighbour",
    start: "selecttower",
    dirs: "rose",
    ifover: "oppwalls",
    draw: { neighbours: { tolayer: "crushtargets" } }
  }
};

export default murusgallicusGenerators;
