import { AlgolBoardBookAnon } from "../../../types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const ariesBoardBook: AlgolBoardBookAnon = {
  basic: {
    height: 8,
    width: 8,
    terrain: { corner: { "1": ["a1"], "2": ["h8"] } }
  }
};

export default ariesBoardBook;
