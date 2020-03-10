// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { MurusgallicusDefinition } from "./_types";

const murusgallicusGenerators: MurusgallicusDefinition["generators"] = {
  findfiretargets: {
    type: "walker",
    start: "selectcatapult",
    dirs: {
      playercase: [
        [7, 8, 1, 2, 3],
        [3, 4, 5, 6, 7],
      ],
    },
    max: 3,
    draw: {
      steps: {
        condition: {
          and: [
            { morethan: [["step"], 1] },
            { noneat: ["myunits", ["target"]] },
          ],
        },
        tolayer: "firetargets",
      },
    },
  },
  findmovetargets: {
    type: "walker",
    blocks: {
      union: [
        "oppunits",
        { ifrulesetelse: ["advanced", "mycatapults", "mytowers"] },
      ],
    },
    start: "selecttower",
    dirs: "rose",
    max: 2,
    draw: {
      steps: {
        condition: {
          and: [{ same: [["walklength"], 2] }, { same: [["step"], 2] }],
        },
        tolayer: "movetargets",
        include: { dir: ["dir"] },
      },
    },
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
              ifrulesetelse: [
                "advanced",
                {
                  ifelse: [
                    { anyat: ["mytowers", "selectmove"] },
                    "madecatapults",
                    "madetowers",
                  ],
                },
                "madetowers",
              ],
            },

            "madewalls",
          ],
        },
      },
      neighbours: {
        tolayer: {
          ifelse: [
            { anyat: ["myunits", ["target"]] },
            {
              ifelse: [
                { anyat: ["mytowers", ["target"]] },
                "madecatapults",
                "madetowers",
              ],
            },
            "madewalls",
          ],
        },
      },
    },
  },
  findcrushtargets: {
    type: "neighbour",
    start: "selecttower",
    dirs: "rose",
    ifover: { union: ["oppcatapults", "oppwalls"] },
    draw: { neighbours: { tolayer: "crushtargets" } },
  },
};

export default murusgallicusGenerators;
