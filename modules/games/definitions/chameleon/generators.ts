import { ChameleonGenerators } from "./_types";

const chameleonGenerators: ChameleonGenerators = {
  findsteptargets: {
    start: "selectunit",
    type: "neighbour",
    dirs: "rose",
    draw: {
      neighbours: {
        condition: { noneat: ["myunits", ["target"]] },
        tolayer: {
          ifelse: [
            {
              or: [
                {
                  and: [{ diag: ["dir"] }, { anyat: ["knights", ["start"]] }],
                },
                {
                  and: [{ ortho: ["dir"] }, { anyat: ["bishops", ["start"]] }],
                },
              ],
            },
            "morph",
            "movetarget",
          ],
        },
      },
    },
  },
  findbishoptargets: {
    start: "selectunit",
    type: "walker",
    dirs: "diag",
    blocks: "units",
    draw: {
      steps: { tolayer: "movetarget" },
      block: {
        condition: { noneat: ["myunits", ["target"]] },
        tolayer: "movetarget",
      },
    },
  },
  findknighttargets: {
    start: "selectunit",
    type: "neighbour",
    dirs: "knight",
    draw: {
      neighbours: {
        condition: { noneat: ["myunits", ["target"]] },
        tolayer: "movetarget",
      },
    },
  },
};

export default chameleonGenerators;
