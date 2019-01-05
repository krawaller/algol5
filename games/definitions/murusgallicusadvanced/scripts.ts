import {GameTestSuite} from '../../types';

const murusgallicusadvancedTests: GameTestSuite = {
  basic: [
    [
      [],
      ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"]
    ],
    [
      ["b1", "d3", "move", "endturn"],
      ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"]
    ],
    [
      ["d7", "d5", "move", "endturn"],
      ["a1", "c1", "d1", "e1", "f1", "g1", "h1"]
    ],
    [
      ["d1", "d3", "move", "endturn"],
      ["a7", "b7", "c7", "e7", "f7", "g7", "h7"]
    ],
    [
      ["e7", "c5", "move", "endturn"],
      ["a1", "c1", "d3", "e1", "f1", "g1", "h1"]
    ],
    [
      ["f1", "d3", "move", "endturn"],
      ["a7", "b7", "c7", "d6", "f7", "g7", "h7"]
    ],
    [
      ["a7", "a5", "move", "endturn"],
      ["a1", "c1", "d3", "e1", "g1", "h1"]
    ],
    [
      ["d3"],
      ["a3", "a6", "b3", "b5", "d5", "d6", "f3", "f5", "g3", "g6"]
    ],
    [
      ["d6", "fire", "endturn"],
      ["b7", "c7", "f7", "g7", "h7"]
    ],
    [
      ["f7", "d5", "move", "endturn"],
      ["a1", "c1", "d3", "e1", "g1", "h1"]
    ],
    [
      ["d3"],
      ["b1", "b3", "b5", "d1", "f1", "f3", "f5"]
    ]
  ]
};

export default murusgallicusadvancedTests;
