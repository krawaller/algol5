import { GameTestSuite } from '../types';

const kickrunTests: GameTestSuite = {
  basic: [
    [["c1"], ["c2", "d1"]],
    [["c2","move","endturn"], ["c5", "d5", "e3", "e4"]],
    [["d5"], ["b3", "c4", "d1", "d2", "d3", "d4"]],
    [["d1", "move", "endturn"], ["a2", "a3", "b1", "c2"]],
    [["c2"], ["c3", "d1", "d2"]],
    [["d1","move","endturn"], ["c5", "e3", "e4", "e5"]],
    [["e4"], ["a4", "b4", "c2", "c4", "d3", "d4"]]
  ]
};

export default kickrunTests;
