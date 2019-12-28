import { ChameleonBoard } from "./_types";

const chameleonBoard: ChameleonBoard = {
  height: 5,
  width: 5,
  terrain: {
    base: { "1": [{ rect: ["a1", "e1"] }], "2": [{ rect: ["a5", "e5"] }] },
  },
  offset: "knight",
};

export default chameleonBoard;
