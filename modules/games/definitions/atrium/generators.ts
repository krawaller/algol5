import {Generators} from '../../../types';
import { AtriumArtifactLayer, AtriumGenerator, AtriumLayer } from './_types';

const atriumGenerators: Generators<AtriumArtifactLayer, AtriumGenerator, AtriumLayer> = {
  findmovetargets: {
    type: "neighbour",
    start: "selectunit",
    dirs: [1, 3, 5, 7],
    unlessover: "units",
    draw: {
      neighbours: {
        tolayer: "movetargets"
      }
    }
  },
  findwinlines: {
    type: "walker",
    starts: "myunits",
    startasstep: true,
    dirs: [1, 2, 3, 4, 5, 6, 7, 8],
    steps: ["ifelse", ["anyat", "mykings", ["start"]], "mykings", "myqueens"],
    draw: {
      steps: {
        condition: ["same", ["walklength"], 3],
        tolayer: "winline"
      }
    }
  }
};

export default atriumGenerators;
