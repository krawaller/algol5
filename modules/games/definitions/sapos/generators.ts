// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { SaposDefinition } from "./_types";

const saposGenerators: SaposDefinition["generators"] = {
  findknots: {
    type: "neighbour",
    starts: "myunits",
    dirs: [1, 2, 3],
    ifover: "myunits",
    draw: {
      neighbours: {
        condition: { same: [3, ["neighbourcount"]] },
        tolayer: "knot",
      },
      start: [
        { tolayer: "forbidden" },
        {
          condition: { same: [3, ["neighbourcount"]] },
          tolayer: "knot",
        },
      ],
    },
  },
  findhoptargets: {
    type: "walker",
    start: { firsttruthy: [{ turnpos: "skippedto" }, "selectunit"] },
    dirs: "rose",
    steps: "myunits",
    blocks: { subtract: ["board", "units"] },
    stopPrio: ["outofbounds", "hitblock", "nomoresteps"],
    draw: {
      block: {
        condition: { same: [["walklength"], 1] },
        unlessover: "forbidden",
        tolayer: "hoptargets",
      },
    },
  },
  findjumptargets: {
    type: "walker",
    start: { firsttruthy: [{ turnpos: "skippedto" }, "selectunit"] },
    dirs: "ortho",
    steps: "oppunits",
    blocks: { subtract: ["board", "units"] },
    stopPrio: ["outofbounds", "hitblock", "nomoresteps"],
    draw: {
      block: [
        {
          condition: { same: [["walklength"], 1] },
          tolayer: "jumptargets",
          include: {
            dir: ["dir"],
          },
        },
      ],
    },
  },
  findjumpvictims: {
    type: "neighbour",
    start: "selectjumptarget",
    dir: {
      reldir: [5, { read: ["jumptargets", "selectjumptarget", "dir"] }],
    },
    draw: {
      neighbours: {
        tolayer: "jumpvictims",
      },
    },
  },
  findspawns: {
    type: "neighbour",
    start: { turnpos: "skippedto" },
    dirs: "rose",
    unlessover: "units",
    draw: {
      start: { tolayer: "forbidden" },
      neighbours: {
        tolayer: "spawns",
      },
    },
  },
};

export default saposGenerators;
