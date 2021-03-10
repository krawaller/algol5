// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { DaoDefinition } from "./_types";

const daoGenerators: DaoDefinition["generators"] = {
  findmovetargets: {
    type: "walker",
    dirs: "rose",
    start: "selectunit",
    blocks: "units",
    draw: {
      last: {
        unlessover: "forbidden",
        tolayer: "movetargets",
      },
    },
  },
  findwinline: {
    type: "walker",
    dirs: "ortho",
    starts: "myunits",
    steps: "myunits",
    startasstep: true,
    draw: {
      steps: {
        condition: { same: [["walklength"], 4] },
        tolayer: "winline",
      },
    },
  },
  findwinblock: {
    type: "neighbour",
    dirs: [1, 2, 3],
    starts: "myunits",
    ifover: "myunits",
    draw: {
      start: {
        condition: { same: [["neighbourcount"], 3] },
        tolayer: "winblock",
      },
      neighbours: {
        condition: { same: [["neighbourcount"], 3] },
        tolayer: "winblock",
      },
    },
  },
  findforbidden: {
    type: "neighbour",
    dirs: "rose",
    starts: { intersect: ["corners", "oppunits"] },
    count: { exceptpos: ["myunits", "selectunit"] },
    draw: {
      start: {
        condition: { same: [["totalcount"], 2] },
        tolayer: "blockvictim",
      },
      neighbours: {
        condition: { same: [["totalcount"], 2] },
        unlessover: "units",
        tolayer: "forbidden",
      },
    },
  },
};

export default daoGenerators;
