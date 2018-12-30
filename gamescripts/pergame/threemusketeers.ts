import { GameTestSuite } from '../types';

const threemusketeersTests: GameTestSuite = {
  basic: [
    [[],["a1", "c3", "e5"]],
    [["c3"],["b3", "c2", "c4", "d3"]],
    [["c4","move","endturn"],["b3", "c2", "d3"]],
    [["c2"],["c3"]],
    [["c3","move","endturn"],["a1", "c4", "e5"]],
    [["c4","c3","move","endturn"],["b2", "b4", "c1", "c5", "d2", "d4"]],
    [["c1","c2","move","endturn"],["a1", "c3", "e5"]],
    [["c3"],["b3", "c2", "d3"]]
  ]
};

export default threemusketeersTests;
