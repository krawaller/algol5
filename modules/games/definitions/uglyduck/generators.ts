import { UglyduckGenerators } from "./_types";

const uglyduckGenerators: UglyduckGenerators = {
  findmovetargets: {
    type: "neighbour",
    start: "selectunit",
    dirs: {
      ifelse: [
        { anyat: ["mykings", "selectunit"] },
        {
          playercase: [
            [4, 5, 6],
            [8, 1, 2]
          ]
        },
        {
          playercase: [
            [8, 1, 2],
            [4, 5, 6]
          ]
        }
      ]
    },
    condition: {
      ifelse: [
        { or: [{ same: [["dir"], 1] }, { same: [["dir"], 5] }] },
        { noneat: ["units", ["target"]] },
        { noneat: ["myunits", ["target"]] }
      ]
    },
    draw: { neighbours: { tolayer: "movetargets" } }
  }
};

export default uglyduckGenerators;
