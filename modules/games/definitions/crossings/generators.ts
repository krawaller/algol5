// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { CrossingsDefinition } from "./_types";

const crossingsGenerators: CrossingsDefinition["generators"] = {
  findsteptargets: {
    type: "neighbour",
    dirs: "rose",
    start: "selecttail",
    unlessover: "units",
    draw: {
      neighbours: {
        tolayer: "steptargets",
      },
    },
  },
  findheads: {
    type: "walker",
    dirs: "rose",
    start: "selecttail",
    steps: "mysoldiers",
    draw: {
      last: {
        tolayer: "heads",
        include: {
          dir: ["dir"],
          max: { sum: [1, ["walklength"]] },
        },
      },
    },
  },
  findphalanx: {
    type: "walker",
    start: "selecthead",
    dir: { reldir: [5, { read: ["heads", "selecthead", "dir"] }] },
    max: { read: ["heads", "selecthead", "max"] },
    startasstep: true,
    draw: {
      steps: { tolayer: "phalanx" },
    },
  },
  findmarchtargets: {
    type: "walker",
    start: "selecthead",
    dir: { read: ["heads", "selecthead", "dir"] },
    max: { read: ["heads", "selecthead", "max"] },
    blocks: "units",
    draw: {
      steps: {
        tolayer: "marchtargets",
        include: {
          length: ["step"],
        },
      },
      block: {
        ifover: "oppsoldiers",
        tolayer: "potentialvictim",
        include: {
          strength: { read: ["heads", "selecthead", "max"] },
          dir: ["dir"],
          length: { sum: [["walklength"], 1] },
        },
      },
    },
  },
  findvictims: {
    type: "walker",
    starts: "potentialvictim",
    dir: { read: ["potentialvictim", ["start"], "dir"] },
    steps: "oppunits",
    draw: {
      start: {
        condition: {
          lessthan: [
            { sum: [1, ["walklength"]] },
            { read: ["potentialvictim", ["start"], "strength"] },
          ],
        },
        tolayer: "marchtargets",
        include: {
          length: { read: ["potentialvictim", ["start"], "length"] },
        },
      },
    },
  },
};

export default crossingsGenerators;
