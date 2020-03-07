// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { CoffeeDefinition } from "./_types";

const coffeeGenerators: CoffeeDefinition["generators"] = {
  findgeneratees: {
    type: "walker",
    dirs: "rose",
    start: "selectdrop",
    draw: {
      steps: {
        unlessover: "units",
        tolayer: {
          indexlist: [
            ["dir"],
            "FOOBAR",
            "vertical",
            "uphill",
            "horisontal",
            "downhill",
            "vertical",
            "uphill",
            "horisontal",
            "downhill"
          ]
        }
      }
    }
  },
  findwinlines: {
    type: "walker",
    dirs: "rose",
    starts: "myunits",
    steps: "myunits",
    startasstep: true,
    draw: {
      steps: {
        condition: { morethan: [["walklength"], 3] },
        tolayer: "winline"
      }
    }
  }
};

export default coffeeGenerators;
