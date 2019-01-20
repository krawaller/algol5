import { AriesGenerators } from './_types';

const ariesGenerators: AriesGenerators = {
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
        condition: ["valinlist", ["stopreason"], "hitblock", "outofbounds"],
        tolayer: "squished"
      }
    }
  }
};

export default ariesGenerators;
