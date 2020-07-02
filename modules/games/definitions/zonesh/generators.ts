// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { ZoneshDefinition } from "./_types";

const zoneshGenerators: ZoneshDefinition["generators"] = {
  findmovetargets: {
    type: "neighbour",
    start: "selectunit",
    dirs: {
      ifelse: [
        {
          or: [
            { anyat: ["mybase", ["start"]] },
            { anyat: ["mythrone", ["start"]] },
          ],
        },
        "ortho",
        "rose",
      ],
    },
    unlessover: "myunits",
    draw: {
      neighbours: {
        tolayer: "movetargets",
      },
    },
  },
};

export default zoneshGenerators;
