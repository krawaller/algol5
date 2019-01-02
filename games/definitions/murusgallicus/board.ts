import {Board} from '../../types';
import { MurusgallicusTerrain } from './_types';

const murusgallicusBoard: Board<MurusgallicusTerrain> = {
  height: 7,
  width: 8,
  terrain: {
    homerow: {
      "1": [
        ["rect", "a1", "h1"]
      ],
      "2": [
        ["rect", "a7", "h7"]
      ]
    }
  }
};

export default murusgallicusBoard;
