// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { GowiththefloeGenerators } from "./_types";

const gowiththefloeGenerators: GowiththefloeGenerators = {
  findeattargets: {
    type: "neighbour",
    dirs: "rose",
    start: "selectunit",
    ifover: "seals",
    draw: { neighbours: { tolayer: "eattargets" } }
  },
  findmovetargets: {
    type: "walker",
    dirs: "rose",
    start: "selectunit",
    max: 2,
    blocks: { union: ["seals", "bears", "water"] },
    draw: {
      steps: {
        unlessover: "holes",
        tolayer: "movetargets",
        include: { dir: ["dir"] }
      }
    }
  },
  findsealsmoves: {
    type: "walker",
    dirs: "rose",
    starts: "seals",
    max: 2,
    count: { subtract: ["nowater", "holes"] },
    draw: {
      start: {
        condition: { morethan: [["totalcount"], 0] },
        tolayer: "canmove"
      }
    }
  },
  findcracks: {
    type: "walker",
    start: "selectmovetarget",
    dir: { reldir: [{ read: ["movetargets", "selectmovetarget", "dir"] }, 5] },
    blocks: { single: "selectunit" },
    draw: {
      steps: { unlessover: "holes", tolayer: "cracks" },
      block: { tolayer: "cracks" }
    }
  }
};

export default gowiththefloeGenerators;
