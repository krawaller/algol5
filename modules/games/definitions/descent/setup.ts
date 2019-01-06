import {Setup} from '../../../types';
import { DescentUnit } from './_types';

const descentSetup: Setup<DescentUnit> = {
  rooks: {
    "0": [
      ["rect", "a2", "d3"], "b4", "c1"
    ],
    "1": ["a1", "c4", "d1"],
    "2": ["a4", "b1", "d4"]
  }
};

export default descentSetup;
