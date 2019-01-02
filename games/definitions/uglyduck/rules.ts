import {Definition} from '../../types';

const uglyduckRules: Definition = {
  startTurn: {
    link: "selectunit"
  },
  endGame: {
    swanhome: {
      condition: ["overlaps", "mykings", "myhomerow"],
      show: ["intersect", "mykings", "myhomerow"]
    }
  },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerator: "findmovetargets",
      link: "selectmovetarget"
    },
    selectmovetarget: {
      from: "movetargets",
      link: "move"
    }
  },
  commands: {
    move: {
      applyEffects: [
        ["if", ["anyat", "opphomerow", "selectmovetarget"],
          ["setat", "selectunit", "group", "kings"]
        ],
        ["stompat", "selectunit", "selectmovetarget"]
      ],
      link: "endturn"
    }
  },
  generators: {
    findmovetargets: {
      type: "neighbour",
      start: "selectunit",
      dirs: ["playercase", ["ifelse", ["anyat", "mykings", "selectunit"],
          ["list", [4, 5, 6]],
          ["list", [8, 1, 2]]
        ],
        ["ifelse", ["anyat", "mykings", "selectunit"],
          ["list", [8, 1, 2]],
          ["list", [4, 5, 6]]
        ]
      ],
      condition: ["ifelse", ["or", ["same", ["dir"], 1],
          ["same", ["dir"], 5]
        ],
        ["noneat", "units", ["target"]],
        ["noneat", "myunits", ["target"]]
      ],
      draw: {
        neighbours: {
          tolayer: "movetargets"
        }
      }
    }
  }
};

export default uglyduckRules;
