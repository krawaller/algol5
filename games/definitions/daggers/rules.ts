import {Definition} from '../../types';
import { DaggersTerrain, DaggersUnit } from './_types';

const daggersRules: Definition<DaggersTerrain, DaggersUnit> = {
  endGame: {
    infiltration: {
      condition: ["overlaps", "mycrowns", "oppbase"],
      show: ["intersect", "mycrowns", "oppbase"]
    },
    regicide: {
      condition: ["same", ["sizeof", "oppcrowns"], 1]
    }
  },
  startTurn: {
    link: "selectunit"
  },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerator: ["ifelse", ["anyat", "mycrowns", "selectunit"], "findcrowntargets", "finddaggertargets"],
      link: "selectmovetarget"
    },
    selectmovetarget: {
      from: "movetarget",
      link: "move"
    }
  },
  commands: {
    move: {
      applyEffects: [
        ["stompat", "selectunit", "selectmovetarget"]
      ],
      link: "endturn"
    }
  },
  generators: {
    findcrowntargets: {
      type: "neighbour",
      dirs: [1, 2, 3, 4, 5, 6, 7, 8],
      start: "selectunit",
      draw: {
        neighbours: {
          condition: ["noneat", "myunits", ["target"]],
          tolayer: "movetarget"
        }
      }
    },
    finddaggertargets: {
      type: "walker",
      start: "selectunit",
      dirs: [8, 1, 2, 4, 5, 6],
      blocks: "units",
      max: ["ifelse", ["valinlist", ["dir"],
        [8, 1, 2]
      ], 1, 8],
      draw: {
        steps: {
          tolayer: "movetarget"
        },
        block: {
          condition: ["and", ["noneat", "myunits", ["target"]],
            ["not", ["and", ["valinlist", ["dir"],
                [1, 5]
              ],
              ["anyat", "oppdaggers", ["target"]]
            ]]
          ],
          tolayer: "movetarget"
        }
      }
    }
  }
};

export default daggersRules;
