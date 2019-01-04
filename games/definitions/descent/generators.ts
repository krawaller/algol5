import {Generators} from '../../types';
import { DescentArtifactLayer, DescentGenerator, DescentLayer } from './_types';

const descentGenerators: Generators<DescentArtifactLayer, DescentGenerator, DescentLayer> = {
  findmovetargets: {
    type: "neighbour",
    start: "selectunit",
    condition: ["ifelse", ["anyat", "rooks", "selectunit"],
      ["noneat", "pawns", ["target"]],
      ["ifelse", ["anyat", "pawns", "selectunit"],
        ["noneat", "rooks", ["target"]],
        ["true"]
      ]
    ],
    draw: {
      neighbours: {
        ifover: "neutralunits",
        tolayer: "movetargets"
      }
    }
  },
  finddigtargets: {
    type: "neighbour",
    start: ["turnpos", "movedto"],
    ifover: "neutralunits",
    draw: {
      neighbours: {
        tolayer: "digtargets"
      }
    }
  },
  findwinlines: {
    type: "walker",
    starts: "myunits",
    startasstep: true,
    steps: ["ifelse", ["anyat", "myrooks", ["start"]], "myrooks", ["ifelse", ["anyat", "myknights", ["start"]], "myknights", "mypawns"]],
    draw: {
      steps: {
        condition: ["morethan", ["walklength"], 2],
        tolayer: "winline"
      }
    }
  }
};

export default descentGenerators;
