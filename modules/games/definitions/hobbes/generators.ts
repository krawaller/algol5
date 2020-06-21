// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { HobbesDefinition } from "./_types";

const hobbesGenerators: HobbesDefinition["generators"] = {
  findmovetargets: {
    type: "floater",
    dirs: "ortho",
    start: { onlyin: "myunits" },
    blocks: "units",
    draw: {
      steps: {
        tolayer: "movetargets",
      },
      blocks: {
        ifover: "oppunits",
        tolayer: "vulnerable",
      },
    },
  },
  findnearbystones: {
    type: "neighbour",
    dirs: "ortho",
    start: { firsttruthy: ["selectmovetarget", { onlyin: "myunits" }] },
    ifover: "stones",
    draw: {
      neighbours: {
        tolayer: {
          ifelse: [
            { truthy: { turnvar: "moved" } },
            "nearbystonesaftermove",
            "nearbystonesnomove",
          ],
        },
        include: {
          dir: ["dir"],
        },
      },
    },
  },
  findpushtargets: {
    type: "walker",
    start: "selectstone",
    dir: {
      read: [
        {
          ifelse: [
            { truthy: { turnvar: "moved" } },
            "nearbystonesaftermove",
            "nearbystonesnomove",
          ],
        },
        "selectstone",
        "dir",
      ],
    },
    blocks: "units",
    draw: {
      steps: {
        tolayer: "pushtargets",
        include: {
          dir: ["dir"],
          distance: ["step"],
        },
      },
    },
  },
  findpulltargets: {
    type: "walker",
    start: { onlyin: "myunits" },
    dir: {
      reldir: [
        {
          read: [
            {
              ifelse: [
                { truthy: { turnvar: "moved" } },
                "nearbystonesaftermove",
                "nearbystonesnomove",
              ],
            },
            "selectstone",
            "dir",
          ],
        },
        5,
      ],
    },
    blocks: "units",
    draw: {
      steps: {
        tolayer: "pulltargets",
        include: {
          dir: ["dir"],
          distance: ["step"],
        },
      },
    },
  },
};

export default hobbesGenerators;
