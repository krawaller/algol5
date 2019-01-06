import { GameTestSuite } from "../../../types";

const murusgallicusTests: GameTestSuite = {
  basic: [
    [[], ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"]],
    [["a1"], ["a3", "c3"]],
    [
      ["c3", "move", "endturn"],
      ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"]
    ],
    [["a7"], ["a5", "c5"]],
    [["c5", "move", "endturn"], ["b1", "c1", "d1", "e1", "f1", "g1", "h1"]],
    [["c1"], ["a3", "c3", "e3"]],
    [["c3", "move", "endturn"], ["b7", "c7", "d7", "e7", "f7", "g7", "h7"]],
    [["b7"], ["b5", "d5"]],
    [["b5", "move", "endturn"], ["b1", "c3", "d1", "e1", "f1", "g1", "h1"]],
    [["c3"], ["a1", "a3", "a5", "c1", "e3", "e5"]],
    [["e5", "move", "endturn"], ["b6", "c7", "d7", "e7", "f7", "g7", "h7"]],
    [["d7"], ["b5", "d5", "f5"]],
    [["f5", "move", "endturn"], ["b1", "d1", "e1", "f1", "g1", "h1"]],
    [["d1"], ["b3", "d3", "f3"]],
    [["d3", "move", "endturn"], ["b6", "c7", "e7", "f7", "g7", "h7"]],
    [["f7", "d5", "move", "endturn"], ["b1", "e1", "f1", "g1", "h1"]],
    [["b1", "d3", "move", "endturn"], ["b6", "c7", "e6", "e7", "g7", "h7"]],
    [["e6"], ["c4", "c6", "e5", "g4", "g6"]],
    [["e5", "kill", "endturn"], ["c2", "d3", "e1", "f1", "g1", "h1"]]
  ]
};

export default murusgallicusTests;
