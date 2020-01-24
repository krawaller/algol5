import { ThreemusketeersGenerators } from "./_types";

const threemusketeersGenerators: ThreemusketeersGenerators = {
  findstrandedmusketeers: {
    type: "neighbour",
    dirs: "ortho",
    starts: "kings",
    ifover: "pawns",
    draw: {
      start: {
        condition: { falsy: ["neighbourcount"] },
        tolayer: "strandedmusketeers"
      }
    }
  },
  findmusketeerline: {
    type: "walker",
    dirs: "ortho",
    starts: "kings",
    count: "kings",
    draw: {
      start: {
        condition: { same: [2, ["totalcount"]] },
        tolayer: "musketeerline"
      }
    }
  },
  findmovetargets: {
    type: "neighbour",
    dirs: "ortho",
    start: "selectunit",
    condition: {
      playercase: [
        { anyat: ["oppunits", ["target"]] },
        { noneat: ["units", ["target"]] }
      ]
    },
    draw: { neighbours: { tolayer: "movetargets" } }
  }
};

export default threemusketeersGenerators;
