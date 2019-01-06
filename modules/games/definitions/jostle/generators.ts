import {Generators} from '../../../types';
import { JostleArtifactLayer, JostleGenerator, JostleLayer } from './_types';

const jostleGenerators: Generators<JostleArtifactLayer, JostleGenerator, JostleLayer> = {
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
};

export default jostleGenerators;
