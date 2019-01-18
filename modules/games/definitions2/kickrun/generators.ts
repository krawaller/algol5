import { KickrunGenerators } from "./_types";

const kickrunGenerators: KickrunGenerators = {
  findmovetargets: {
    type: "walker",
    start: "selectunit",
    dirs: {
      ifelse: [
        { anyat: ["myrunners", "selectunit"] },
        { playercase: [{ list: [1, 2, 3] }, { list: [5, 6, 7] }] },
        { playercase: [{ list: [8, 1, 3, 4] }, { list: [4, 5, 7, 8] }] }
      ]
    },
    max: { ifelse: [{ anyat: ["myrunners", "selectunit"] }, 4, 1] },
    blocks: "units",
    draw: {
      steps: {
        condition: {
          and: [{ different: [["dir"], 8] }, { different: [["dir"], 4] }]
        },
        tolayer: "movetargets"
      },
      block: {
        condition: {
          and: [
            { anyat: ["oppunits", ["target"]] },
            { or: [{ same: [["dir"], 8] }, { same: [["dir"], 4] }] }
          ]
        },
        tolayer: "movetargets"
      }
    }
  }
};

export default kickrunGenerators;
