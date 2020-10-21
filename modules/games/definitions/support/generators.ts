// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { SupportDefinition } from "./_types";

const supportGenerators: SupportDefinition["generators"] = {
  findpushtargets: {
    type: "walker",
    start: "selectorigin",
    dirs: "rose",
    blocks: { subtract: ["board", "mysoldiers"] },
    startasstep: true,
    draw: {
      block: {
        condition: {
          and: [
            { noneat: ["edge", ["target"]] },
            { noneat: ["bases", ["target"]] },
          ],
        },
        tolayer: "pushtargets",
        include: {
          dir: ["dir"],
        },
      },
    },
  },
  findpushees: {
    type: "walker",
    start: "selectdestination",
    dir: { reldir: [{ read: ["pushtargets", "selectdestination", "dir"] }, 5] },
    draw: {
      steps: {
        tolayer: "pushees",
      },
    },
  },
  findconnected: {
    type: "floater",
    start: "selectorigin",
    dirs: "rose",
    steps: "myunits",
    draw: {
      steps: {
        tolayer: "connected",
      },
    },
  },
  findmovetargets: {
    type: "neighbour",
    starts: "connected",
    dirs: "rose",
    draw: {
      neighbours: {
        condition: {
          and: [
            { noneat: ["myunits", ["target"]] },
            { noneat: ["bases", ["target"]] },
          ],
        },
        tolayer: "movetargets",
      },
    },
  },
};

export default supportGenerators;
