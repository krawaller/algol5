import {Board} from '../../types';

const serauqsBoard: Board = {
  height: 4,
  width: 4,
  terrain: {
    base: {
      "1": [
        ["rect", "a1", "d1"]
      ],
      "2": [
        ["rect", "a4", "d4"]
      ]
    },
    corners: ["a1", "a4", "d1", "d4"],
    middle: [
      ["rect", "b2", "c3"]
    ]
  }
};

export default serauqsBoard;
