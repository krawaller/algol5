// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { YonmoqueDefinition } from "./_types";

const yonmoqueGenerators: YonmoqueDefinition["generators"] = {
  findsteptargets: {
    type: "neighbour",
    start: "selectunit",
    dirs: "rose",
    unlessover: "units",
    draw: {
      neighbours: {
        tolayer: "movetargets",
      },
    },
  },
  findslidetargets: {
    type: "walker",
    start: "selectunit",
    dirs: "diag",
    blocks: "units",
    draw: {
      steps: {
        tolayer: "movetargets",
      },
    },
  },
  findconversions: {
    type: "walker",
    start: "selectmovetarget",
    dirs: "rose",
    steps: "oppunits",
    blocks: "myunits",
    stopPrio: ["outofbounds", "hitblock", "nomoresteps", "reachedmax"],
    draw: {
      steps: [
        {
          condition: { stoppedBecause: "hitblock" },
          tolayer: "conversions",
        },
        {
          condition: {
            and: [
              { stoppedBecause: "hitblock" },
              { anyat: ["bishops", ["target"]] },
              { noneat: ["mybase", ["target"]] },
            ],
          },
          tolayer: "demote",
        },
        {
          condition: {
            and: [
              { stoppedBecause: "hitblock" },
              { anyat: ["pawns", ["target"]] },
              { anyat: ["mybase", ["target"]] },
            ],
          },
          tolayer: "promote",
        },
      ],
    },
  },
};

export default yonmoqueGenerators;
