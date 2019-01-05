import {GameTestSuite} from '../../types';

const daggersTests: GameTestSuite = {
  basic: [
    [
      [],
      ["c7", "d7", "d8", "e7", "e8", "f7"]
    ],
    [
      ["c7"],
      ["a5", "b6", "b8", "c4", "c5", "c6", "c8", "d6", "e5", "f4", "g3", "h2"]
    ],
    [
      ["g3", "move", "endturn"],
      ["b2", "c1", "c2", "c3", "d2", "e2", "f1", "f2", "f3", "g2"]
    ],
    [
      ["f2"],
      ["e1", "e3", "g1", "g3"]
    ],
    [
      ["e3", "move", "endturn"],
      ["d7", "d8", "e7", "e8", "f7", "g3"]
    ],
    [
      ["g3"],
      ["e1", "f2", "f4", "g4", "h2", "h4"]
    ],
    [
      ["f2", "move", "endturn"],
      ["b2", "c1", "c2", "c3", "d2", "e2", "e3", "f1", "f3", "g2"]
    ],
    [
      ["f1"],
      ["e1", "f2", "g1"]
    ]
  ]
};

export default daggersTests;
