import {Board} from '../../types';

const daggersBoard: Board = {
  height: 8,
  width: 8,
  terrain: {
    base: {
      "1": [
        ["rect", "a8", "h8"]
      ],
      "2": [
        ["rect", "a1", "h1"]
      ]
    }
  }
};

export default daggersBoard;
