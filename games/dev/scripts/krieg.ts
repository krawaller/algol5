import { GameTestSuite } from "../../../types";

const kriegTests: GameTestSuite = {
  basic: [
    [[], ["a3", "b3", "b4"]],
    [["b3"], ["b2", "c3"]],
    [["c3", "move", "endturn"], ["c1", "c2", "d2"]],
    [["c2", "b2", "move", "endturn"], ["a3", "a4", "b4"]],
    [["a4"], ["b3"]],
    [["b3", "move", "endturn"], ["c1", "d1", "d2"]],
    [["d2"], ["c2", "d3"]],
    [["d3", "move", "endturn"], ["a3", "b4", "c3"]],
    [["c3"], ["c2", "c4"]],
    [["c2", "move", "endturn"], ["b2", "c1", "d1"]],
    [["d1", "d2", "move", "endturn"], ["a3", "b3", "b4"]],
    [["b3"], ["a4", "c3"]],
    [["c3", "move", "endturn"], ["b2", "c1", "d3"]],
    [["b2"], ["a2", "b1", "b3"]],
    [["b3", "move", "endturn"], ["a3", "b4", "c2"]],
    [["c2"], ["b2", "d1"]],
    [["d1", "move"], ["win"]],
    [["win"], []]
  ]
};

export default kriegTests;
