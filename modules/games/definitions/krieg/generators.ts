import { KriegGenerators } from './_types';

const kriegGenerators: KriegGenerators = {
  findmovetargets: {
    type: "neighbour",
    start: "selectunit",
    unlessover: "units",
    dirs: {
      ifelse: [
        { anyat: ["southeast", ["start"]] },
        [1, 3, 4, 5, 7],
        {
          ifelse: [
            { anyat: ["northwest", ["start"]] },
            [1, 3, 5, 7, 8],
            "ortho"
          ]
        }
      ]
    },
    draw: { neighbours: { tolayer: "movetargets" } }
  }
};

export default kriegGenerators;
