// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { DesdemonaDefinition } from "./_types";

const desdemonaGenerators: DesdemonaDefinition["generators"] = {
  findmovetargets: {
    type: "walker",
    dirs: "rose",
    start: { firsttruthy: ["selectunit", "selectcapturer"] },
    blocks: "units",
    draw: {
      steps: {
        tolayer: "movetargets",
      },
    },
  },
  findspawntargets: {
    type: "walker",
    dirs: "rose",
    start: { turnpos: "movedto" },
    blocks: "units",
    draw: {
      steps: [
        {
          tolayer: "firetargets",
        },
      ],
    },
  },
  findcapturetargets: {
    type: "walker",
    dirs: "rose",
    start: { turnpos: "movedto" },
    blocks: { subtract: ["board", "oppstones"] },
    draw: {
      block: [
        {
          tolayer: "capturespot",
          include: { dir: ["dir"] },
        },
        {
          condition: {
            and: [
              { noneat: ["units", ["target"]] },
              { morethan: [["walklength"], 0] },
            ],
          },
          tolayer: "firetargets",
        },
      ],
    },
  },
  findvictims: {
    type: "walker",
    dir: { reldir: [{ read: ["capturespot", ["start"], "dir"] }, 5] },
    start: "selectfiretarget",
    steps: "oppstones",
    draw: {
      steps: {
        tolayer: "victims",
      },
    },
  },
  findoppmovers: {
    type: "neighbour",
    dirs: "rose",
    condition: { noneat: ["units", ["target"]] },
    starts: "oppamazons",
    draw: {
      start: {
        condition: { truthy: ["neighbourcount"] },
        tolayer: "oppmovers",
      },
    },
  },
  findreachablesquares: {
    type: "walker",
    dirs: "rose",
    starts: "myunits",
    blocks: "units",
    draw: {
      steps: {
        tolayer: "reachablesquares",
      },
    },
  },
  findcapturestarts: {
    type: "walker",
    dirs: "rose",
    starts: "reachablesquares",
    blocks: { subtract: ["board", "units"] },
    stopPrio: ["outofbounds", "hitblock", "nomoresteps"],
    steps: "oppstones",
    draw: {
      start: {
        condition: {
          and: [{ truthy: ["walklength"] }, { stoppedBecause: "hitblock" }],
        },
        tolayer: "capturestarts",
      },
    },
  },
  findcapturers: {
    type: "walker",
    starts: "capturestarts",
    dirs: "rose",
    blocks: "myamazons",
    draw: {
      block: {
        tolayer: "capturers",
      },
    },
  },
};

export default desdemonaGenerators;
