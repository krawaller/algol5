import { GameTestSuite } from '../../types';

const orthokonTests: GameTestSuite = {
  basic: [
    [[],["a1", "b1", "c1", "d1"]],
    [["a1"],["a3", "c3"]],
    [["c3","move","endturn"],["a4", "b4", "d4"]],
    [["d4","d2","move","endturn"],["b1", "c1", "c3", "c4"]],
    [["b1"],["a1", "a2", "b3", "d3"]],
  ]
};

export default orthokonTests;
