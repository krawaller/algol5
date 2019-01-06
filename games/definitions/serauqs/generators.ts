import {Generators} from '../../../types';
import { SerauqsArtifactLayer, SerauqsGenerator, SerauqsLayer } from './_types';

const serauqsGenerators: Generators<SerauqsArtifactLayer, SerauqsGenerator, SerauqsLayer> = {
  findmovetargets: {
    type: "neighbour",
    start: "selectunit",
    dirs: [1, 2, 3, 4, 5, 6, 7, 8],
    unlessover: "units",
    draw: {
      neighbours: {
        tolayer: "movetargets"
      }
    }
  },
  findwinline: {
    type: "walker",
    starts: ["union", "myunits", "oppwild"],
    dirs: [1, 2, 3, 4, 5, 6, 7, 8],
    steps: ["union", "myunits", "oppwild"],
    count: "mybase",
    startasstep: true,
    draw: {
      steps: {
        condition: ["and", ["same", ["walklength"], 4],
          ["different", ["totalcount"], 4]
        ],
        tolayer: "winline"
      }
    }
  }
};

export default serauqsGenerators;
