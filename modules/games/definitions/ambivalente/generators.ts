// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { AmbivalenteDefinition } from "./_types";

const ambivalenteGenerators: AmbivalenteDefinition["generators"] = {
  findtouchedfoes: {
    type: "neighbour",
    dirs: "rose",
    start: "selectdroptarget",
    ifover: "oppunits",
    draw: {
      neighbours: {
        tolayer: "touchedfoes",
        include: { dir: ["dir"] },
      },
    },
  },
  findintrusionvictims: {
    type: "neighbour",
    starts: "touchedfoes",
    dir: { reldir: ["d5f2r0", { read: ["touchedfoes", ["start"], "dir"] }] },
    ifover: "oppunits",
    draw: {
      neighbours: {
        tolayer: "victims",
      },
    },
  },
  findcornerintrusionvictims: {
    type: "neighbour",
    start: "selectdroptarget",
    dirs: "ortho",
    ifover: "oppunits",
    draw: {
      neighbours: {
        condition: { same: [["neighbourcount"], 2] },
        tolayer: "victims",
      },
    },
  },
  findcustodianvictims: {
    type: "neighbour",
    starts: "touchedfoes",
    dir: { read: ["touchedfoes", ["start"], "dir"] },
    ifover: "myunits",
    draw: {
      start: {
        condition: { truthy: ["neighbourcount"] },
        tolayer: "victims",
      },
    },
  },
  findcornercustodianvictims: {
    type: "neighbour",
    starts: { intersect: ["corners", "oppunits"] },
    dirs: "ortho",
    ifover: { union: ["myunits", { single: "selectdroptarget" }] },
    draw: {
      start: {
        condition: { same: [2, ["neighbourcount"]] },
        tolayer: "victims",
      },
    },
  },
};

export default ambivalenteGenerators;
