import { OrthokonGenerators } from './_types';

const orthokonGenerators: OrthokonGenerators = {
  findvictims: {
    type: "neighbour",
    start: "selectmovetarget",
    dirs: [1, 3, 5, 7],
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
    dirs: [1, 2, 3, 4, 5, 6, 7, 8],
    blocks: "units",
    draw: {
      last: {
        tolayer: "movetargets"
      }
    }
  }
};

export default orthokonGenerators;
