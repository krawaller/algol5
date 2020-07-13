// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { BombardmentDefinition } from "./_types";

const bombardmentGenerators: BombardmentDefinition["generators"] = {
  findmoveandboomtargets: {
    type: "neighbour",
    dirs: "rose",
    start: "selectunit",
    draw: {
      start: {
        tolayer: "boomtargets",
      },
      neighbours: [
        { tolayer: "boomtargets" },
        {
          condition: {
            and: [
              { noneat: ["units", ["target"]] },
              {
                playercase: [
                  {
                    or: [
                      { same: [["dir"], 8] },
                      { same: [["dir"], 1] },
                      { same: [["dir"], 2] },
                    ],
                  },
                  {
                    or: [
                      { same: [["dir"], 4] },
                      { same: [["dir"], 5] },
                      { same: [["dir"], 6] },
                    ],
                  },
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

export default bombardmentGenerators;
