import { GowiththefloeGenerators } from './_types';

const gowiththefloeGenerators: GowiththefloeGenerators = {
  findeattargets: {
    type: "neighbour",
    start: "selectunit",
    ifover: "seals",
    draw: {
      neighbours: {
        tolayer: "eattargets"
      }
    }
  },
  findmovetargets: {
    type: "walker",
    start: "selectunit",
    max: 2,
    blocks: ["union", "seals", "bears", "water"],
    draw: {
      steps: {
        unlessover: "holes",
        tolayer: "movetargets",
        include: {
          dir: ["dir"]
        }
      }
    }
  },
  findsealsmoves: {
    type: "walker",
    starts: "seals",
    max: 2,
    count: ["subtract", "nowater", "holes"],
    draw: {
      start: {
        condition: ["morethan", ["totalcount"], 0],
        tolayer: "canmove"
      }
    }
  },
  findcracks: {
    type: "walker",
    start: "selectmovetarget",
    dir: ["reldir", ["read", "movetargets", "selectmovetarget", "dir"], 5],
    blocks: ["single", "selectunit"],
    draw: {
      steps: {
        unlessover: "holes",
        tolayer: "cracks"
      },
      block: {
        tolayer: "cracks"
      }
    }
  }
};

export default gowiththefloeGenerators;
