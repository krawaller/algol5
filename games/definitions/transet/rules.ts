import {Definition} from '../../types';
import { TransetTerrain, TransetUnit } from './_types';

const transetRules: Definition<TransetTerrain, TransetUnit> = {
  endGame: {
    infiltration: {
      condition: ["overlaps", "myunits", "oppbase"],
      show: ["intersect", "myunits", "oppbase"]
    }
  },
  startTurn: {
    link: "selectunit"
  },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerator: "findmovetargets",
      links: ["selectmovetarget", "selectswapunit"]
    },
    selectmovetarget: {
      from: "movetargets",
      link: ["ifelse", ["and", ["anyat", "units", "selectmovetarget"],
        ["noneat", "oppbase", "selectmovetarget"]
      ], "selectdeportdestination", "move"]
    },
    selectdeportdestination: {
      from: ["subtract", "oppbase", "oppunits"],
      link: "move"
    },
    selectswapunit: {
      from: ["subtract", "myunits", ["single", "selectunit"]],
      runGenerator: "findswap1steps",
      link: "selectswap1target"
    },
    "selectswap1target": {
      from: "swap1steps",
      runGenerator: "findswap2step",
      link: ["if", ["notempty", "swap2step"], "swap"]
    }
  },
  commands: {
    move: {
      applyEffects: [
        ["if", ["anyat", "units", "selectmovetarget"],
          ["ifelse", ["anyat", "oppbase", "selectmovetarget"],
            ["killat", "selectmovetarget"],
            ["moveat", "selectmovetarget", "selectdeportdestination"]
          ]
        ],
        ["moveat", "selectunit", "selectmovetarget"]
      ],
      link: "endturn"
    },
    swap: {
      applyEffects: [
        ["moveat", "selectunit", "selectswap1target"],
        ["moveat", "selectswapunit", ["onlyin", "swap2step"]]
      ],
      link: "endturn"
    }
  },
  generators: {
    "findswap2step": {
      type: "neighbour",
      start: "selectswapunit",
      dir: ["reldir", 5, ["read", "swap1steps", "selectswap1target", "dir"]],
      unlessover: ["union", "units", ["single", "selectswap1target"]],
      draw: {
        neighbours: {
          tolayer: "swap2step"
        }
      }
    },
    "findswap1steps": {
      type: "neighbour",
      start: "selectunit",
      dirs: [1, 3, 5, 7],
      unlessover: "units",
      draw: {
        neighbours: {
          tolayer: "swap1steps",
          include: {
            dir: ["dir"]
          }
        }
      }
    },
    findmovetargets: {
      type: "neighbour",
      start: "selectunit",
      dirs: ["playercase", ["ifelse", ["anyat", "pinets", "selectunit"],
          [1],
          ["ifelse", ["anyat", "piokers", "selectunit"],
            [8, 2],
            [8, 1, 2]
          ]
        ],
        ["ifelse", ["anyat", "pinets", "selectunit"],
          [5],
          ["ifelse", ["anyat", "piokers", "selectunit"],
            [4, 6],
            [4, 5, 6]
          ]
        ]
      ],
      unlessover: "myunits",
      draw: {
        neighbours: {
          tolayer: "movetargets"
        }
      }
    }
  }
};

export default transetRules;
