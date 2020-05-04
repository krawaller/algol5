// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { CampaignDefinition } from "./_types";

const campaignGenerators: CampaignDefinition["generators"] = {
  findjumptargets: {
    type: "neighbour",
    dirs: "knight",
    starts: "myknights",
    unlessover: "units",
    draw: {
      neighbours: {
        tolayer: "jumptargets",
      },
    },
  },
  findwinlineheads: {
    type: "walker",
    dirs: "rose",
    start: { turnpos: "jumpedfrom" },
    steps: "myunits",
    draw: {
      last: {
        tolayer: "winlineheads",
        include: {
          dir: { reldir: [5, ["dir"]] },
        },
      },
    },
  },
  findwinlines: {
    type: "walker",
    starts: "winlineheads",
    dir: { read: ["winlineheads", ["start"], "dir"] },
    startasstep: true,
    steps: "myunits",
    draw: {
      steps: {
        condition: { morethan: [["walklength"], 3] },
        tolayer: "winline",
      },
    },
  },
};

export default campaignGenerators;
