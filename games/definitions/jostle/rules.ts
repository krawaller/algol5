import {Definition} from '../../types';
import { JostleArtifactLayer, JostleCommand, JostleGenerator, JostleLayer, JostleMark, JostleUnit } from './_types';

const jostleRules: Definition<JostleArtifactLayer, JostleCommand, JostleGenerator, JostleLayer, JostleMark, JostleUnit> = {
  startTurn: {
    link: "selectunit"
  },
  marks: {
    selectunit: {
      from: "mycheckers",
      runGenerator: "findinitial",
      link: "selectmovetarget"
    },
    selectmovetarget: {
      from: "movetargets",
      runGenerator: "findnew",
      link: ["if", ["morethan", ["minus", ["sizeof", "newfriend"],
          ["sum", 1, ["sizeof", "newenemy"]]
        ],
        ["minus", ["sizeof", "initialfriend"],
          ["sizeof", "initialenemy"]
        ]
      ], "jostle"]
    }
  },
  commands: {
    jostle: {
      applyEffect: ["moveat", "selectunit", "selectmovetarget"],
      link: "endturn"
    }
  },
  generators: {
    findinitial: {
      type: "neighbour",
      dirs: [1, 3, 5, 7],
      start: "selectunit",
      draw: {
        neighbours: {
          tolayer: ["ifelse", ["noneat", "units", ["target"]], "movetargets", ["ifelse", ["anyat", "oppunits", ["target"]], "initialenemy", "initialfriend"]]
        }
      }
    },
    findnew: {
      type: "neighbour",
      dirs: [1, 3, 5, 7],
      start: "selectmovetarget",
      ifover: "units",
      draw: {
        neighbours: {
          tolayer: ["ifelse", ["anyat", "oppunits", ["target"]], "newenemy", "newfriend"]
        }
      }
    }
  }
};

export default jostleRules;
