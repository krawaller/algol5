// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { KriegGenerators } from "./_types";

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
