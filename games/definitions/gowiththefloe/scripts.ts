import { GameTestSuite } from '../../types';

const goewiththefloeTests: GameTestSuite = {
  basic: [
    [[],["b2","b7"]],
    [["b7"],["a6", "b5", "b6", "c6", "c7", "c8", "d5", "d7"]],
    [["d5","move","endturn"],["g2", "g7"]],
    [["g7"],["e5", "e7", "f6", "f7", "f8", "g5", "g6", "h6"]],
    [["e5","move","endturn"],["b2", "d5"]],
    [["d5"],["b3", "b5", "c4", "c5", "d3", "d4", "d6", "d7", "e4", "e6", "f3", "f7"]],
    [["d3","move","endturn"],["e5", "g2"]],
    [["e5"],["c3", "c5", "c7", "d6", "e3", "e4", "e6", "e7", "f4", "f5", "g3", "g5"]],
    [["c3","move","endturn"],["b2", "d3"]],
    [["d3"],["b5", "c2", "c4", "d1", "d2", "e2", "e3", "e4", "f1", "f3", "f5"]],
    [["e4","move","endturn"],["c3", "g2"]],
    [["c3"],["a3", "a5", "b2", "b3", "b4", "c1", "c2", "c4", "c5", "d2", "e1", "e3"]],
    [["b2","eat","endturn"],["e4"]],
    [["e4"],["c2", "c4", "e2", "e3", "e6", "f3", "f4", "f5", "g4", "g6"]],
    [["c4","move","endturn"],["g2"]],
    [["g2","e2","move","endturn"],["c4"]],
    [["c4","c5","move","endturn"],["e2"]],
    [["e2","d2","move","endturn"],["c5"]],
    [["c5","b4","move","endturn"],["d2"]],
    [["d2","c3","move","endturn"],["b4"]],
    [["b4"],["a3", "a4", "a5", "b2", "b3", "b5", "b6", "d6"]],
    [["d6","move","endturn"],["c3"]]
  ]
};

export default goewiththefloeTests;
