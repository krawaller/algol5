// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import {JesonmorDefinition} from "./_types";

const jesonmorGenerators: JesonmorDefinition["generators"] = {
  findmovetargets: {
    start: "selectunit",
    type: "neighbour",
    dirs: "knight",
    draw: {
      neighbours: {
        unlessover: "myunits",
        condition: {
          or: [
            {not: {overlaps: ["oppunits", "center"]}},
            {anyat: ["center", ["target"]]}
          ]
        }
        tolayer: "movetargets"
      }
    },
  }
};

export default jesonmorGenerators;
