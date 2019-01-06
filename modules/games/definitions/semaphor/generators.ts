import {Generators} from '../../../types';
import { SemaphorArtifactLayer, SemaphorGenerator, SemaphorLayer } from './_types';

const semaphorGenerators: Generators<SemaphorArtifactLayer, SemaphorGenerator, SemaphorLayer> = {
  findlines: {
    type: "walker",
    dirs: [1, 2, 3, 4],
    starts: "units",
    steps: ["unitlayer", ["read", "units", ["start"], "group"]],
    startasstep: true,
    draw: {
      steps: {
        condition: ["morethan", ["walklength"], 2],
        tolayer: "line"
      }
    }
  }
};

export default semaphorGenerators;
