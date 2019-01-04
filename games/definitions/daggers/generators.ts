import {Generators} from '../../types';
import { DaggersArtifactLayer, DaggersGenerator, DaggersLayer } from './_types';

const daggersGenerators: Generators<DaggersArtifactLayer, DaggersGenerator, DaggersLayer> = {
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
};

export default daggersGenerators;
