import {GameTestSuite} from '../../../types';

const serauqsTests: GameTestSuite = {
  basic: [
    [
      [],
      ["a1", "b1", "c1", "d1"]
    ],
    [
      ["d1"],
      ["promote"]
    ],
    [
      ["promote", "endturn"],
      ["a4", "b4", "c4", "d4"]
    ],
    [
      ["a4", "promote", "endturn"],
      ["a1", "b1", "c1", "d1"]
    ],
    [
      ["b1"],
      ["a2", "b2", "c2"]
    ],
    [
      ["b2"],
      ["move"]
    ],
    [
      ["move", "endturn"],
      ["a4", "b4", "c4", "d4"]
    ]
  ]
};

export default serauqsTests;
