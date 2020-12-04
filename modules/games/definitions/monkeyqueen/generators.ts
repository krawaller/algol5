// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { MonkeyqueenDefinition } from "./_types";

const monkeyqueenGenerators: MonkeyqueenDefinition["generators"] = {
  findmovetargets: {
    type: "walker",
    start: "selectunit",
    dirs: "rose",
    blocks: "units",
    draw: {
      steps: {
        condition: {
          or: [
            {
              and: [
                { anyat: ["myqueens", ["start"]] },
                {
                  morethan: [
                    { battlevar: { playercase: ["plr1life", "plr2life"] } },
                    2,
                  ],
                },
              ],
            },
            {
              and: [
                { anyat: ["mybabies", ["start"]] },
                {
                  morethan: [
                    { distance: ["selectunit", { onlyin: "oppqueens" }] },
                    { distance: [["target"], { onlyin: "oppqueens" }] },
                  ],
                },
              ],
            },
          ],
        },
        tolayer: "movetargets",
      },
      block: {
        ifover: "oppunits",
        tolayer: "movetargets",
      },
    },
  },
};

export default monkeyqueenGenerators;
