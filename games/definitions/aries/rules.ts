import {Definition} from '../../types';
import { AriesUnit, AriesArtifactLayer, AriesLayer, AriesGenerator, AriesMark, AriesCommand } from './_types';

const ariesRules: Definition<AriesUnit, AriesArtifactLayer, AriesLayer, AriesGenerator, AriesMark, AriesCommand> = {
  startTurn: {
    link: "selectunit"
  },
  endGame: {
    invade: {
      condition: ["overlaps", "oppcorner", "myunits"],
      show: ["intersect", "oppcorner", "myunits"]
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
      runGenerator: ["if", ["anyat", "oppunits", "selectmovetarget"], "findpushresults"],
      link: "move"
    }
  },
  commands: {
    move: {
      applyEffects: [
        ["setbattlevar", "pusheeid", ["idat", "selectmovetarget"]],
        ["setbattlepos", "pushsquare", "selectmovetarget"],
        ["pushin", "beingpushed", ["read", "movetargets", "selectmovetarget", "dir"], 1],
        ["killin", "squished"],
        ["moveat", "selectunit", "selectmovetarget"]
      ],
      link: "endturn"
    }
  },
  generators: {
    findmovetargets: {
      type: "walker",
      start: "selectunit",
      dirs: [1, 3, 5, 7],
      blocks: "units",
      draw: {
        steps: {
          tolayer: "movetargets"
        },
        block: {
          ifover: "oppunits",
          condition: ["not", ["and", ["samepos", ["target"],
              ["battlepos", "pushsquare"]
            ],
            ["same", ["idat", "selectunit"],
              ["battlevar", "pusheeid"]
            ]
          ]],
          tolayer: "movetargets",
          include: {
            dir: ["dir"]
          }
        }
      }
    },
    findpushresults: {
      type: "walker",
      start: "selectmovetarget",
      dir: ["reldir", 1, ["read", "movetargets", "selectmovetarget", "dir"]],
      steps: "oppunits",
      blocks: "myunits",
      startasstep: true,
      testblocksbeforesteps: true,
      draw: {
        steps: {
          tolayer: "beingpushed"
        },
        last: {
          condition: ["valinlist", ["stopreason"],
            ["hitblock", "outofbounds"]
          ],
          tolayer: "squished"
        }
      }
    }
  }
};

export default ariesRules;
