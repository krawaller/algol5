import { DaggersBoard } from "./_types";

const daggersBoard: DaggersBoard = {
  height: 8,
  width: 8,
  terrain: {
    base: {
      "1": [{ rect: ["a8", "h8"] }],
      "2": [{ rect: ["a1", "h1"] }]
    }
  }
};

export default daggersBoard;
