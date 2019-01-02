import {Board} from '../../types';
import { TransetTerrain } from './_types';

const transetBoard: Board<TransetTerrain> = {
  height: 5,
  width: 5,
  terrain: {
    base: {
      "1": [
        ["rect", "a1", "e1"]
      ],
      "2": [
        ["rect", "a5", "e5"]
      ]
    }
  }
};

export default transetBoard;
