import { AlgolBoardBookAnon } from "../../../types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const gogolBoardBook: AlgolBoardBookAnon = {
  basic: {
    height: 8,
    width: 8,
    terrain: {
      homerow: { "1": [{ rect: ["a1", "h1"] }], "2": [{ rect: ["a8", "h8"] }] },
      edges: [
        { rect: ["a1", "a8"] },
        { rect: ["h1", "h8"] },
        { rect: ["b8", "g8"] },
        { rect: ["b1", "g1"] }
      ]
    }
  }
};

export default gogolBoardBook;
