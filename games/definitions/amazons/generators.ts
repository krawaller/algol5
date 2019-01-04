import {Generators} from '../../types';
import { AmazonsArtifactLayer, AmazonsGenerator, AmazonsLayer } from './_types';

const amazonsGenerators: Generators<AmazonsArtifactLayer, AmazonsGenerator, AmazonsLayer> = {
  findtargets: {
    type: "walker",
    dirs: [1, 2, 3, 4, 5, 6, 7, 8],
    start: ["actionor", "selectunit", "selectunit", ["turnpos", "movedto"]],
    blocks: "units",
    draw: {
      steps: {
        tolayer: "targets"
      }
    }
  }
};

export default amazonsGenerators;
