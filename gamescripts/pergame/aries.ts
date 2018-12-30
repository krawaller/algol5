import { GameTestSuite } from '../types';

const ariesTests: GameTestSuite = {
  basic: [
    [[],["a4", "b4", "c4", "d1", "d2", "d3", "d4"]],
    [["d4"],["d5", "d6", "d7", "d8", "e4", "f4", "g4", "h4"]],
    [["g4","move","endturn"],["e5", "e6", "e7", "e8", "f5", "g5", "h5"]],
    [["g5","g4","move","endturn"],["a4", "b4", "c4", "d1", "d2", "d3", "g3"]],
    [["c4"],["c5", "c6", "c7", "c8", "d4", "e4", "f4", "g4"]],
    [["g4","move","endturn"],["e5", "e6", "e7", "e8", "f5", "g6", "h4", "h5"]],
  ],
  nopushback: [
    [["d3", "f3", "move", "endturn", "f5", "f3", "move", "endturn", "f2"],[],["f3"]]
  ]
};

export default ariesTests;
