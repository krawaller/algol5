import {Board} from '../../types';
import { MurusgallicusadvancedTerrain } from './_types';

const murusgallicusadvancedBoard: Board<MurusgallicusadvancedTerrain> = {
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

export default murusgallicusadvancedBoard;
