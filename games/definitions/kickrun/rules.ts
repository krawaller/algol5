import {Definition} from '../../types';
import { KickrunTerrain, KickrunUnit } from './_types';

const kickrunRules: Definition<KickrunTerrain, KickrunUnit> = {
  startTurn: {
    link: "selectunit"
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
      applyEffect: ["stompat", "selectunit", "selectmovetarget"],
      link: "endturn"
    }
  },
  endGame: {
    infiltration: {
      condition: ["overlaps", "myrunners", "oppcorners"],
      show: ["intersect", "myrunners", "oppcorners"]
    }
  },
  generators: {
    findmovetargets: {
      type: "walker",
      start: "selectunit",
      dirs: ["playercase", ["ifelse", ["anyat", "myrunners", "selectunit"],
          [1, 2, 3],
          [8, 1, 3, 4]
        ],
        ["ifelse", ["anyat", "myrunners", "selectunit"],
          [5, 6, 7],
          [4, 5, 7, 8]
        ]
      ],
      max: ["ifelse", ["anyat", "myrunners", "selectunit"], 4, 1],
      blocks: "units",
      draw: {
        steps: {
          condition: ["and", ["different", ["dir"], 8],
            ["different", ["dir"], 4]
          ],
          tolayer: "movetargets"
        },
        block: {
          condition: ["and", ["anyat", "oppunits", ["target"]],
            ["or", ["same", ["dir"], 8],
              ["same", ["dir"], 4]
            ]
          ],
          tolayer: "movetargets"
        }
      }
    }
  }
};

export default kickrunRules;
