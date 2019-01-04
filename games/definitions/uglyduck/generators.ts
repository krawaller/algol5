import {Generators} from '../../types';
import { UglyduckArtifactLayer, UglyduckGenerator, UglyduckLayer } from './_types';

const uglyduckGenerators: Generators<UglyduckArtifactLayer, UglyduckGenerator, UglyduckLayer> = {
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
};

export default uglyduckGenerators;
