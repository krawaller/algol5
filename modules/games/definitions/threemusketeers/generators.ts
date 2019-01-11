import { ThreemusketeersGenerators } from './_types';

const threemusketeersGenerators: ThreemusketeersGenerators = {
  findstrandedmusketeers: {
    type: "neighbour",
    dirs: [1, 3, 5, 7],
    starts: "kings",
    ifover: "pawns",
    draw: {
      start: {
        condition: ["falsy", ["neighbourcount"]],
        tolayer: "strandedmusketeers"
      }
    }
  },
  findmusketeerline: {
    type: "walker",
    dirs: [1, 3, 5, 7],
    starts: "kings",
    count: "kings",
    draw: {
      start: {
        condition: ["same", 2, ["totalcount"]],
        tolayer: "musketeerline"
      }
    }
  },
  findmovetargets: {
    type: "neighbour",
    dirs: [1, 3, 5, 7],
    start: "selectunit",
    condition: ["playercase", ["anyat", "oppunits", ["target"]],
      ["noneat", "units", ["target"]]
    ],
    draw: {
      neighbours: {
        tolayer: "movetargets"
      }
    }
  }
};

export default threemusketeersGenerators;
