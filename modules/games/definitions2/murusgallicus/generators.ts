import { MurusgallicusGenerators } from "./_types";

const murusgallicusGenerators: MurusgallicusGenerators = {
  findmovetargets: {
    type: "walker",
    dirs: ["rose"],
    blocks: { union: ["oppunits", "mytowers"] },
    start: "selecttower",
    max: 2,
    draw: {
      steps: {
        condition: {
          and: [{ same: [["walklength"], 2] }, { same: [["step"], 2] }]
        },
        tolayer: "movetargets",
        include: {
          dir: ["dir"]
        }
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
  findkilltargets: {
    type: "neighbour",
    start: "selecttower",
    dirs: ["rose"],
    ifover: "oppwalls",
    draw: {
      neighbours: {
        tolayer: "killtargets"
      }
    }
  }
};

export default murusgallicusGenerators;
