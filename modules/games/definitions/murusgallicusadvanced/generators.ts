import { MurusgallicusadvancedGenerators } from './_types';

const murusgallicusadvancedGenerators: MurusgallicusadvancedGenerators = {
  findfiretargets: {
    type: "walker",
    start: "selectcatapult",
    dirs: { playercase: [[7, 8, 1, 2, 3], [3, 4, 5, 6, 7]] },
    max: 3,
    draw: {
      steps: {
        condition: {
          and: [
            { morethan: [["step"], 1] },
            { noneat: ["myunits", ["target"]] }
          ]
        },
        tolayer: "firetargets"
      }
    }
  },
  findmovetargets: {
    type: "walker",
    blocks: { union: ["oppunits", "mycatapults"] },
    start: "selecttower",
    dirs: "rose",
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
            {
              ifelse: [
                { anyat: ["mytowers", "selectmove"] },
                "madecatapults",
                "madetowers"
              ]
            },
            "madewalls"
          ]
        }
      },
      neighbours: {
        tolayer: {
          ifelse: [
            { anyat: ["myunits", ["target"]] },
            {
              ifelse: [
                { anyat: ["mytowers", ["target"]] },
                "madecatapults",
                "madetowers"
              ]
            },
            "madewalls"
          ]
        }
      }
    }
  },
  findkilltargets: {
    type: "neighbour",
    start: "selecttower",
    dirs: "rose",
    ifover: { union: ["oppcatapults", "oppwalls"] },
    draw: { neighbours: { tolayer: "killtargets" } }
  }
};

export default murusgallicusadvancedGenerators;
