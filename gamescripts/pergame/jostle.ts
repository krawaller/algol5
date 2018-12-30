import { GameTestSuite } from '../types';

const jostleTests: GameTestSuite = {
  basic: [
    [[],["c4", "c6", "c8", "d3", "d5", "e4", "e8", "f3", "f7", "g6", "g8", "h3", "h5", "h7"]],
    [["h3"],["h2", "i3"]],
    [["h2","jostle","endturn"],["c3", "c5", "c7", "d6", "d8", "e3", "e7", "f4", "f8", "g3", "g5", "h4", "h6", "h8"]],
    [["g5"],["f5"]],
    [["f5","jostle","endturn"],["c4", "c6", "c8", "d3", "d5", "e4", "e8", "f3", "f7", "g4", "g6", "g8", "h5", "h7"]],
    [["c6","b6","jostle","endturn"],["c3", "c5", "c7", "d6", "d8", "e3", "e7", "f8", "g3", "h4", "h6", "h8"]],
    [["e7","e6","jostle","endturn"],["c4", "c8", "d3", "d5", "d7", "e4", "e8", "f3", "f7", "g4", "g6", "g8", "h5", "h7"]],
    [["h5"],["g5","i5"]],
    [["i5","jostle","endturn"],["c3", "c5", "c7", "d6", "d8", "e3", "f8", "g3", "h4", "h6", "h8"]]
  ]
};

export default jostleTests;
