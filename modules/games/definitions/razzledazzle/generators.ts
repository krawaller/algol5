// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { RazzledazzleDefinition } from "./_types";

const razzledazzleGenerators: RazzledazzleDefinition["generators"] = {
  findpasstargets: {
    type: "walker",
    starts: "mycarriers",
    blocks: "units",
    dirs: "rose",
    draw: {
      block: {
        ifover: "myreceivers",
        tolayer: "passtargets",
      },
    },
  },
  findmovetargets: {
    start: "selectmover",
    type: "neighbour",
    dirs: "knight",
    unlessover: "units",
    draw: {
      neighbours: {
        tolayer: "movetargets",
      },
    },
  },
};

export default razzledazzleGenerators;
