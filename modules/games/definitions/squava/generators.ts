// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { SquavaDefinition } from "./_types";

const squavaGenerators: SquavaDefinition["generators"] = {
  findlinebeginnings: {
    type: "walker",
    dirs: "rose",
    starts: "myunits",
    steps: "myunits",
    draw: {
      last: {
        tolayer: "linebeginnings",
      },
    },
  },
  findendlines: {
    type: "walker",
    dirs: "rose",
    starts: "linebeginnings",
    steps: "myunits",
    startasstep: true,
    draw: {
      steps: [
        {
          condition: { same: [["walklength"], 3] },
          tolayer: "loseline",
        },
        {
          condition: { same: [["walklength"], 4] },
          tolayer: "winline",
        },
      ],
    },
  },
};

export default squavaGenerators;
