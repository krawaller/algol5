// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { TunnelerDefinition } from "./_types";

const tunnelerGenerators: TunnelerDefinition["generators"] = {
  find2x2squares: {
    type: "neighbour",
    start: "selectmovetarget",
    dirs: "rose",
    unlessover: "neutralunits",
    draw: {
      neighbours: {
        tolayer: "bitsum",
        include: {
          empty: { indexlist: [["dir"], 0, 1, 2, 4, 8, 16, 32, 64, 128] },
        },
      },
      start: {
        condition: { truthy: ["neighbourcount"] },
        tolayer: "bitsum",
        include: {
          bit: { harvest: ["bitsum", "empty"] },
        },
      },
    },
  },
  findmovetargets: {
    type: "walker",
    start: "selectunit",
    dirs: "ortho",
    blocks: "units",
    draw: {
      steps: {
        tolayer: "movetargets",
      },
      block: [
        {
          condition: {
            or: [
              { anyat: ["neutralunits", ["target"]] },
              {
                and: [
                  { anyat: ["oppunits", ["target"]] },
                  { anyat: ["tunnelers", ["start"]] },
                ],
              },
            ],
          },
          tolayer: "movetargets",
        },
      ],
    },
  },
};

export default tunnelerGenerators;
