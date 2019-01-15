import { DuploGenerators } from "./_types";

const duploGenerators: DuploGenerators = {
  findspawndirs: {
    type: "neighbour",
    start: "selectunit",
    draw: {
      neighbours: {
        condition: { noneat: ["myunits", ["target"]] },
        tolayer: "spawndirs",
        include: {
          dir: ["dir"]
        }
      }
    }
  },
  findgrowstarts: {
    type: "walker",
    starts: "spawndirs",
    steps: "myunits",
    dir: { reldir: [{ read: ["spawndirs", ["start"], "dir"] }, 5] },
    draw: {
      start: {
        tolayer: "growstarts",
        include: {
          dir: { reldir: [["dir"], 5] },
          strength: ["walklength"]
        }
      }
    }
  },
  findexpandpoints: {
    type: "walker",
    starts: "growstarts",
    dir: { read: ["growstarts", ["start"], "dir"] },
    startasstep: true,
    blocks: "oppunits",
    steps: { subtract: ["board", "units"] },
    testblocksbeforesteps: true,
    max: { read: ["growstarts", ["start"], "strength"] },
    draw: {
      steps: {
        condition: { same: [["step"], ["max"]] },
        tolayer: "targets",
        include: {
          dir: { reldir: [["dir"], 5] }
        }
      },
      block: {
        tolayer: "potentialopptargets",
        include: {
          dir: ["dir"],
          strength: ["max"]
        }
      }
    }
  },
  findoppstrengths: {
    type: "walker",
    starts: "potentialopptargets",
    dir: { read: ["potentialopptargets", ["start"], "dir"] },
    max: { read: ["potentialopptargets", ["start"], ["strength"]] },
    startasstep: true,
    steps: "oppunits",
    draw: {
      start: {
        tolayer: "targets",
        condition: { different: [["stopreason"], "reachedmax"] },
        include: {
          dir: { reldir: [["dir"], 5] }
        }
      }
    }
  },
  findspawns: {
    type: "walker",
    start: "selecttarget",
    dir: { read: ["targets", "selecttarget", "dir"] },
    blocks: "units",
    draw: {
      start: {
        condition: { noneat: ["units", ["start"]] },
        tolayer: "spawns"
      },
      steps: {
        tolayer: "spawns"
      }
    }
  }
};

export default duploGenerators;
