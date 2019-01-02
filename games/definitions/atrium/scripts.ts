import { GameTestSuite } from '../../types';

const atriumTests: GameTestSuite = {
  basic: [
    [[],["a2", "a3", "c5", "d1", "d5", "e2"]],
    [["e2"],["d2", "e1"]],
    [["d2","move","endturn"],["a4", "b1", "b5", "c1", "e3", "e4"]],
    [["e3"],["d3", "e2"]],
    [["d3","move","endturn"],["a2", "a3", "c5", "d1", "d2", "d5"]],
    [["c5","c4","move","endturn"],["a4", "b1", "b5", "c1", "d3", "e4"]],
    [["d3"],["c3", "d4", "e3"]],
    [["c3","move","endturn"],["a2", "a3", "c4", "d1", "d2", "d5"]],
    [["a2","b2","move","endturn"],["a4", "b1", "b5", "c1", "c3", "e4"]],
    [["c3","b3","move","endturn"],["a3", "b2", "c4", "d1", "d2", "d5"]],
    [["c4","c3","move","endturn"],["a4", "b1", "b3", "b5", "c1", "e4"]],
    [["b5","b4","move","endturn"],["a3", "b2", "c3", "d1", "d2", "d5"]],
    [["c3","c2","move","win"],[]]
  ]
};

export default atriumTests;
