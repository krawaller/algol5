import {Board} from '../../../types';
import { AriesTerrain } from './_types';

const ariesBoard: Board<AriesTerrain> = {
  height: 8,
  width: 8,
  terrain: {
    corner: {
      "1": ["a1"],
      "2": ["h8"]
    }
  }
};

export default ariesBoard;
