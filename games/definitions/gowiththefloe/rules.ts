import {Definition} from '../../types';
import { GowiththefloeArtifactLayer, GowiththefloeCommand, GowiththefloeGenerator, GowiththefloeLayer, GowiththefloeMark, GowiththefloeUnit } from './_types';

const gowiththefloeRules: Definition<GowiththefloeArtifactLayer, GowiththefloeCommand, GowiththefloeGenerator, GowiththefloeLayer, GowiththefloeMark, GowiththefloeUnit> = {
  STATUS: "wip",
  startTurn: {
    link: "selectunit"
  },
  endGame: {
    safeseal: {
      condition: ["different", ["sizeof", "canmove"],
        ["sizeof", "seals"]
      ],
      show: ["subtract", "seals", "canmove"],
      who: 1
    },
    sealseaten: {
      condition: ["isempty", "seals"],
      who: 2
    }
  },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerators: ["findmovetargets", ["ifplayer", 2, "findeattargets"]],
      links: ["selectmovetarget", ["ifplayer", 2, "selecteattarget"]]
    },
    selectmovetarget: {
      from: "movetargets",
      runGenerator: "findcracks",
      link: "move"
    },
    selecteattarget: {
      from: "eattargets",
      link: "eat"
    }
  },
  commands: {
    move: {
      applyEffects: [
        ["moveat", "selectunit", "selectmovetarget"],
        ["spawnin", "cracks", "holes", 0]
      ],
      runGenerator: "findsealsmoves",
      link: "endturn"
    },
    eat: {
      applyEffects: [
        ["killat", "selectunit"],
        ["killat", "selecteattarget"]
      ],
      runGenerator: "findsealsmoves",
      link: "endturn"
    }
  },
  generators: {
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
  }
};

export default gowiththefloeRules;
