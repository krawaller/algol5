import {Setup} from '../../types';
import { JostleUnit } from './_types';

const jostleSetup: Setup<JostleUnit> = {
  checkers: {
    "1": ["c4", "c6", "c8", "d3", "d5", "d7", "e4", "e8", "f3", "f7", "g4", "g6", "g8", "h3", "h5", "h7"],
    "2": ["c3", "c5", "c7", "d4", "d6", "d8", "e3", "e7", "f4", "f8", "g3", "g5", "g7", "h4", "h6", "h8"]
  }
};

export default jostleSetup;
