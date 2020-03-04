import { AlgolBoardBookAnon } from "../../../types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const murusgallicusadvancedBoardBook: AlgolBoardBookAnon = {
  basic: {
    height: 7,
    width: 8,
    terrain: {
      homerow: { "1": [{ rect: ["a1", "h1"] }], "2": [{ rect: ["a7", "h7"] }] }
    }
  }
};

export default murusgallicusadvancedBoardBook;
