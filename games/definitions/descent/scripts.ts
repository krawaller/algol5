import { GameTestSuite } from '../../types';

const descentTests: GameTestSuite = {
  basic: [
    [[],["a1", "c4", "d1"]],
    [["c4"],["b3", "b4", "c3", "d3"]],
    [["b3","move"],["a2", "a3", "b2", "b4", "c2", "c3", "c4"]],
    [["c3","dig","endturn"],["a4", "b1", "d4"]],
    [["d4"],["c3", "c4", "d3"]],
    [["d3","move"],["c2", "c3", "c4", "d2", "d4"]],
    [["c3","dig","endturn"],["a1", "b3", "d1"]],
    [["a1","b2","move"],["a1", "a2", "a3", "c1", "c2", "c3"]],
    [["c3","dig","endturn"],["a4", "b1", "d3"]],
    [["d3"],["c2", "c4", "d2", "d4"]],
    [["d2","move","c1","dig","endturn"],["b2", "b3", "d1"]],
    [["b2","c2","move","b2","dig","win"],[]]
  ]
};

export default descentTests;
