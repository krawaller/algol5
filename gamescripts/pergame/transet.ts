import { GameTestSuite } from '../types';

const transetTests: GameTestSuite = {
  basic: [
    [[], ["a1", "b1", "c1", "d1", "e1"]],
    [["c1"], ["b2", "c2", "d2"]],
    [["c2","move","endturn"], ["a5", "b5", "c5", "d5", "e5"]],
    [["b5"], ["a4", "c4"]],
    [["c4","move","endturn"], ["a1", "b1", "c2", "d1", "e1"]],
    [["c2"], ["a1", "b1", "b3", "c3", "d1", "d3", "e1"]],
    [["d1"], ["c1", "d2"]],
    [["d2","swap","endturn"], ["a5", "c4", "c5", "d5", "e5"]],
    [["c4"], ["a5", "b3", "c5", "d3"]],
    [["d3","move","endturn"], ["a1", "b1", "c1", "d2", "e1"]],
    [["d2"], ["a1", "b1", "c1", "c3", "d3", "e1", "e3"]],
    [["d3","b5","move","endturn"], ["a5", "b5", "c5", "d5", "e5"]]
  ]
};

export default transetTests;
