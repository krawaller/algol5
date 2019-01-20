import { OrthokonGenerators } from "./_types";

const orthokonGenerators: OrthokonGenerators = {
  findvictims: {
    type: "neighbour",
    start: "selectmovetarget",
    dirs: ["ortho"],
    ifover: "oppunits",
    draw: {
      neighbours: {
        tolayer: "victims"
      }
    }
  },
  findmovetargets: {
    type: "walker",
    start: "selectunit",
    dirs: ["rose"],
    blocks: "units",
    draw: {
      last: {
        tolayer: "movetargets"
      }
    }
  }
};

export default orthokonGenerators;
