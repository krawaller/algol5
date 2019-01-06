import {Setup} from '../../../types';
import { ThreemusketeersUnit } from './_types';

const threemusketeersSetup: Setup<ThreemusketeersUnit> = {
  kings: {
    "1": ["a1", "c3", "e5"]
  },
  pawns: {
    "2": [
      ["holerect", "a1", "e5", ["a1", "c3", "e5"]]
    ]
  }
};

export default threemusketeersSetup;
