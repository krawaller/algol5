import {Board} from '../../../types';
import { KickrunTerrain } from './_types';

const kickrunBoard: Board<KickrunTerrain> = {
  height: 5,
  width: 5,
  terrain: {
    corners: {
      "1": ["a1"],
      "2": ["e5"]
    }
  }
};

export default kickrunBoard;
