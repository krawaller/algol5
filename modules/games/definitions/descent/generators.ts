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
        { anyat: ["lvl3", "selectunit"] },
        {
          and: [
            { noneat: ["lvl1", ["target"]] },
            { noneat: ["lvl0", ["target"]] }
          ]
        },
        {
          ifelse: [
            { anyat: ["lvl2", "selectunit"] },
            { noneat: ["lvl0", ["target"]] },
            {
              ifelse: [
                { anyat: ["lvl1", "selectunit"] },
                { noneat: ["lvl3", ["target"]] },
                {
                  and: [
                    { noneat: ["lvl2", ["target"]] },
                    { noneat: ["lvl3", ["target"]] }
                  ]
                }
              ]
            }
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
    unlessover: "lvl0",
    draw: { neighbours: { tolayer: "digtargets" } }
  },
  findwinlines: {
    type: "walker",
    dirs: "rose",
    starts: "myunits",
    startasstep: true,
    steps: {
      ifelse: [
        { anyat: ["mylvl3", ["start"]] },
        "mylvl3",
        {
          ifelse: [
            { anyat: ["mylvl2", ["start"]] },
            "mylvl2",
            { ifelse: [{ anyat: ["mylvl1", ["start"]] }, "mylvl1", "mylvl0"] }
          ]
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
