import {GameTestSuite} from '../../types';

const coffeeTests: GameTestSuite = {
  basic: [
    [
      [],
      ["a1", "a2", "a3", "a4", "a5", "b1", "b2", "b3", "b4", "b5", "c1", "c2", "c3", "c4", "c5", "d1", "d2", "d3", "d4", "d5", "e1", "e2", "e3", "e4", "e5"]
    ],
    [
      ["c3"],
      ["downhill", "horisontal", "uphill", "vertical"]
    ],
    [
      ["downhill", "endturn"],
      ["a5", "b4", "d2", "e1"]
    ],
    [
      ["b4"],
      ["horisontal", "uphill", "vertical"]
    ],
    [
      ["uphill", "endturn"],
      ["a3", "c5"]
    ],
    [
      ["c5", "vertical", "endturn"],
      ["c1", "c2", "c4"]
    ],
    [
      ["c2"],
      ["downhill", "horisontal", "uphill"]
    ]
  ]
};

export default coffeeTests;
