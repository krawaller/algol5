// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { BreakthroughDefinition } from "./_types";

const breakthroughGenerators: BreakthroughDefinition["generators"] = {
  findmovetargets: {
    type: "neighbour",
    start: "selectunit",
    dirs: {
      ifrulesetelse: [
        "siege",
        {
          playercase: [
            [7, 8, 1],
            [3, 4, 5],
          ],
        },
        {
          playercase: [
            [8, 1, 2],
            [4, 5, 6],
          ],
        },
      ],
    },
    condition: {
      ifelse: [
        {
          same: [
            ["dir"],
            {
              ifrulesetelse: [
                "siege",
                { playercase: [8, 4] },
                { playercase: [1, 5] },
              ],
            },
          ],
        },
        { noneat: ["units", ["target"]] },
        { noneat: ["myunits", ["target"]] },
      ],
    },
    draw: { neighbours: { tolayer: "movetargets" } },
  },
};

export default breakthroughGenerators;
