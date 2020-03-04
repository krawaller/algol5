import { AlgolBoardBookAnon } from "../../../types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const serauqsBoardBook: AlgolBoardBookAnon = {
  basic: {
    height: 4,
    width: 4,
    terrain: {
      base: { "1": [{ rect: ["a1", "d1"] }], "2": [{ rect: ["a4", "d4"] }] },
      corners: ["a1", "a4", "d1", "d4"],
      middle: [{ rect: ["b2", "c3"] }]
    }
  }
};

export default serauqsBoardBook;
