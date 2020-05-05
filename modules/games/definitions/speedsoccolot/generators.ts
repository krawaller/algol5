// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { SpeedsoccolotDefinition } from "./_types";

const speedsoccolotGenerators: SpeedsoccolotDefinition["generators"] = {
  findplayeroptions: {
    type: "neighbour",
    start: "selectunit",
    dirs: "rose",
    unlessover: "players",
    draw: {
      neighbours: [
        {
          ifover: "ball",
          tolayer: "closeball",
          include: { dir: ["dir"] },
        },
        {
          tolayer: "runtargets",
          include: { dir: ["dir"] },
        },
      ],
    },
  },
  finddribbletarget: {
    type: "neighbour",
    starts: "closeball",
    dir: { read: ["runtargets", "selectruntarget", "dir"] },
    condition: {
      or: [
        { samepos: ["selectunit", ["target"]] },
        { noneat: ["units", ["target"]] },
      ],
    },
    draw: {
      neighbours: {
        tolayer: "dribbletarget",
      },
    },
  },
  findkicktargets: {
    type: "walker",
    starts: "closeball",
    dir: { read: ["closeball", ["start"], "dir"] },
    blocks: "units",
    draw: {
      steps: {
        tolayer: "kicktargets",
      },
    },
  },
};

export default speedsoccolotGenerators;
