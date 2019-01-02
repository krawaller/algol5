import {Board} from '../../types';
import { UglyduckTerrain } from './_types';

const uglyduckBoard: Board<UglyduckTerrain> = {
  height: 5,
  width: 5,
  terrain: {
    homerow: {
      "1": [
        ["rect", "a1", "e1"]
      ],
      "2": [
        ["rect", "a5", "e5"]
      ]
    }
  }
};

export default uglyduckBoard;
