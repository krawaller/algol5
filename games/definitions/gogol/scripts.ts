import { GameTestSuite } from '../../types';

const gogolTests: GameTestSuite = {
  basic: [
    [[],["a3", "a4", "a5", "a6", "a7", "b3", "b4", "b5", "b6", "b7", "c3", "c4", "c5", "c6", "c7", "d3", "d4", "d5", "d6", "d7", "e3", "e4", "e5", "e6", "e7", "f3", "f4", "f5", "f6", "f7", "g3", "g4", "g5", "g6", "g7", "h3", "h4", "h5", "h6", "h7"]],
    [["g4","deploy","endturn"],["a2", "a3", "a4", "a5", "a6", "b2", "b3", "b4", "b5", "b6", "c2", "c3", "c4", "c5", "c6", "d2", "d3", "d4", "d5", "d6", "e2", "e3", "e4", "e5", "e6", "f2", "f3", "f4", "f5", "f6", "g2", "g3", "g5", "g6", "h2", "h3", "h4", "h5", "h6"]],
    [["f4","deploy","endturn"],["a1", "b1", "c1", "d1", "e1", "f1", "g1", "g4", "h1"]],
    [["g4"],["d7", "e4", "e6", "f3", "f5", "g3", "g5", "g6", "g7", "h3", "h4", "h5"]],
    [["d7","move","endturn"],["a8", "b8", "c8", "d8", "e8", "f4", "f8", "g8", "h8"]],
    [["e8"],["a2", "a3", "a4", "a5", "a6", "a7", "b2", "b3", "b4", "b5", "b6", "b7", "c2", "c3", "c4", "c5", "c6", "c7", "d2", "d3", "d4", "d5", "d6", "e2", "e3", "e4", "e5", "e6", "e7", "f2", "f3", "f5", "f6", "f7", "g2", "g3", "g4", "g5", "g6", "g7", "h2", "h3", "h4", "h5", "h6", "h7"]],
    [["d6","move","endturn"],["a1", "b1", "c1", "d1", "d7", "e1", "f1", "g1", "h1"]],
    [["d7"],["a4", "a7", "b5", "b7", "c6", "c7", "d5", "e6", "e7", "e8", "f5", "f7", "g4", "g7", "h3", "h7"]],
    [["d5","jump","endturn"],["a8", "b8", "c8", "d8", "f4", "f8", "g8", "h8"]]
  ]
};

export default gogolTests;
