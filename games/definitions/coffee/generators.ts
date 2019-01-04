import {Generators} from '../../types';
import { CoffeeArtifactLayer, CoffeeGenerator, CoffeeLayer } from './_types';

const coffeeGenerators: Generators<CoffeeArtifactLayer, CoffeeGenerator, CoffeeLayer> = {
  findgeneratees: {
    type: "walker",
    dirs: [1, 2, 3, 4, 5, 6, 7, 8],
    start: "selectdrop",
    draw: {
      steps: {
        unlessover: "units",
        tolayer: ["indexlist", ["dir"],
          ["FOOBAR", "vertical", "uphill", "horisontal", "downhill", "vertical", "uphill", "horisontal", "downhill"]
        ]
      }
    }
  },
  findwinlines: {
    type: "walker",
    starts: "myunits",
    steps: "myunits",
    startasstep: true,
    draw: {
      steps: {
        condition: ["same", 4, ["walklength"]],
        tolayer: "winline"
      }
    }
  }
};

export default coffeeGenerators;
