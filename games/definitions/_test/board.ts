import {Board} from '../../types';
import { _testTerrain } from './_types';

const _testBoard: Board<_testTerrain> = {
  height: 10,
  width: 10,
  terrain: {
    steps: [
      ["rect", "a1", "d4"]
    ]
  }
};

export default _testBoard;
